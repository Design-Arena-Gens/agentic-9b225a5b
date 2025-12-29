'use client'

import { Trophy, Target, Award } from 'lucide-react'
import type { Challenge } from '../types'

interface ProgressDashboardProps {
  completedChallenges: Set<number>
  totalChallenges: number
  score: number
  challenges: Challenge[]
}

export default function ProgressDashboard({
  completedChallenges,
  totalChallenges,
  score,
  challenges,
}: ProgressDashboardProps) {
  const completionRate = Math.round((completedChallenges.size / totalChallenges) * 100)

  const difficultyStats = {
    easy: challenges.filter(c => c.difficulty === 'easy' && completedChallenges.has(c.id)).length,
    medium: challenges.filter(c => c.difficulty === 'medium' && completedChallenges.has(c.id)).length,
    hard: challenges.filter(c => c.difficulty === 'hard' && completedChallenges.has(c.id)).length,
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Progress</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Target size={24} />
            <h3 className="font-semibold text-lg">Completed</h3>
          </div>
          <p className="text-3xl font-bold">
            {completedChallenges.size}/{totalChallenges}
          </p>
          <p className="text-sm opacity-90 mt-1">{completionRate}% Complete</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Trophy size={24} />
            <h3 className="font-semibold text-lg">Total Score</h3>
          </div>
          <p className="text-3xl font-bold">{score}</p>
          <p className="text-sm opacity-90 mt-1">Points Earned</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Award size={24} />
            <h3 className="font-semibold text-lg">Level</h3>
          </div>
          <p className="text-3xl font-bold">
            {score < 50 ? 'Beginner' : score < 150 ? 'Intermediate' : 'Advanced'}
          </p>
          <p className="text-sm opacity-90 mt-1">Keep going!</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold mb-4 text-gray-800">Challenges by Difficulty</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-green-700 font-medium">Easy</span>
            <span className="text-gray-700">{difficultyStats.easy} completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-yellow-700 font-medium">Medium</span>
            <span className="text-gray-700">{difficultyStats.medium} completed</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-700 font-medium">Hard</span>
            <span className="text-gray-700">{difficultyStats.hard} completed</span>
          </div>
        </div>
      </div>
    </div>
  )
}
