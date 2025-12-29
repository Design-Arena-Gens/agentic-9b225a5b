'use client'

import { useState, useEffect } from 'react'
import CodeEditor from './components/CodeEditor'
import ChallengePanel from './components/ChallengePanel'
import ProgressDashboard from './components/ProgressDashboard'
import { challenges } from './data/challenges'
import type { Challenge } from './types'

export default function Home() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge>(challenges[0])
  const [code, setCode] = useState('')
  const [testResults, setTestResults] = useState<any[]>([])
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [showDashboard, setShowDashboard] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    setCode(currentChallenge.starterCode)
  }, [currentChallenge])

  const runTests = () => {
    try {
      const results = currentChallenge.tests.map(test => {
        try {
          const func = new Function('return ' + code)()
          const result = func(...test.input)
          const passed = JSON.stringify(result) === JSON.stringify(test.expected)
          return {
            ...test,
            passed,
            actual: result
          }
        } catch (error: any) {
          return {
            ...test,
            passed: false,
            error: error.message
          }
        }
      })

      setTestResults(results)

      const allPassed = results.every(r => r.passed)
      if (allPassed && !completedChallenges.has(currentChallenge.id)) {
        setCompletedChallenges(new Set([...completedChallenges, currentChallenge.id]))
        setScore(score + currentChallenge.points)
      }

      return allPassed
    } catch (error) {
      console.error('Error running tests:', error)
      return false
    }
  }

  const selectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setTestResults([])
  }

  const nextChallenge = () => {
    const currentIndex = challenges.findIndex(c => c.id === currentChallenge.id)
    if (currentIndex < challenges.length - 1) {
      selectChallenge(challenges[currentIndex + 1])
    }
  }

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Code Improver</h1>
              <p className="text-lg opacity-90">Master programming through practice</p>
            </div>
            <button
              onClick={() => setShowDashboard(!showDashboard)}
              className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg backdrop-blur-sm transition-all font-semibold"
            >
              {showDashboard ? 'Hide' : 'Show'} Dashboard
            </button>
          </div>
        </header>

        {showDashboard && (
          <ProgressDashboard
            completedChallenges={completedChallenges}
            totalChallenges={challenges.length}
            score={score}
            challenges={challenges}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ChallengePanel
              challenges={challenges}
              currentChallenge={currentChallenge}
              completedChallenges={completedChallenges}
              onSelectChallenge={selectChallenge}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {currentChallenge.title}
              </h2>
              <div className="flex gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentChallenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentChallenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {currentChallenge.difficulty.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  {currentChallenge.category}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                  {currentChallenge.points} points
                </span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {currentChallenge.description}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2">Example:</h3>
                <pre className="text-sm text-gray-700">
                  <code>{currentChallenge.example}</code>
                </pre>
              </div>

              {currentChallenge.hints && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-blue-600 font-semibold hover:text-blue-800">
                    💡 Show Hints
                  </summary>
                  <ul className="mt-2 space-y-2 ml-4">
                    {currentChallenge.hints.map((hint, idx) => (
                      <li key={idx} className="text-gray-700">• {hint}</li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={runTests}
              testResults={testResults}
              onNext={nextChallenge}
              hasNext={challenges.findIndex(c => c.id === currentChallenge.id) < challenges.length - 1}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
