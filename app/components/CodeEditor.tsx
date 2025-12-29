'use client'

import { useState } from 'react'
import { Play, Check, X, ChevronRight } from 'lucide-react'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  onRun: () => boolean
  testResults: any[]
  onNext: () => void
  hasNext: boolean
}

export default function CodeEditor({ code, onChange, onRun, testResults, onNext, hasNext }: CodeEditorProps) {
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      onRun()
      setIsRunning(false)
    }, 500)
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(r => r.passed)

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-gray-800 px-6 py-3 flex justify-between items-center">
        <span className="text-white font-semibold">Code Editor</span>
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run Tests'}
          </button>
          {allTestsPassed && hasNext && (
            <button
              onClick={onNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all"
            >
              Next Challenge
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 p-4 font-mono text-sm focus:outline-none resize-none bg-gray-50"
        spellCheck="false"
      />

      {testResults.length > 0 && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="font-bold text-lg mb-4">Test Results:</h3>
          <div className="space-y-3">
            {testResults.map((result, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  result.passed ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    {result.passed ? (
                      <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    ) : (
                      <X className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    )}
                    <div>
                      <p className="font-semibold">{result.description}</p>
                      <p className="text-sm mt-1 text-gray-600">
                        Input: {JSON.stringify(result.input)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expected: {JSON.stringify(result.expected)}
                      </p>
                      {!result.passed && (
                        <p className="text-sm text-red-600">
                          {result.error ? `Error: ${result.error}` : `Got: ${JSON.stringify(result.actual)}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allTestsPassed && (
            <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
              <p className="text-xl font-bold text-green-800">🎉 All tests passed! Great job!</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
