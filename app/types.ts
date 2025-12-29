export interface TestCase {
  input: any[]
  expected: any
  description: string
}

export interface Challenge {
  id: number
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  points: number
  starterCode: string
  tests: TestCase[]
  example: string
  hints?: string[]
}
