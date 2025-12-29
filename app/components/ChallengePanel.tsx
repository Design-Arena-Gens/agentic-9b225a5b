'use client'

import { Check } from 'lucide-react'
import type { Challenge } from '../types'

interface ChallengePanelProps {
  challenges: Challenge[]
  currentChallenge: Challenge
  completedChallenges: Set<number>
  onSelectChallenge: (challenge: Challenge) => void
}

export default function ChallengePanel({
  challenges,
  currentChallenge,
  completedChallenges,
  onSelectChallenge,
}: ChallengePanelProps) {
  const categories = Array.from(new Set(challenges.map(c => c.category)))

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 h-fit">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Challenges</h2>

      <div className="space-y-2">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.has(challenge.id)
          const isCurrent = challenge.id === currentChallenge.id

          return (
            <button
              key={challenge.id}
              onClick={() => onSelectChallenge(challenge)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-blue-500 text-white shadow-lg'
                  : isCompleted
                  ? 'bg-green-50 hover:bg-green-100 border border-green-200'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{challenge.title}</span>
                    {isCompleted && (
                      <Check size={16} className="text-green-600" />
                    )}
                  </div>
                  <div className="flex gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${
                      isCurrent ? 'bg-white/20' :
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded ${
                      isCurrent ? 'bg-white/20' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {challenge.points} pts
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="font-semibold mb-3 text-gray-800">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <span
              key={category}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
