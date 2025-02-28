export interface QuizQuestion {
  soalID: number
  question?: string
  pilihan: string[]
  kunci: string[] | string | number
}

export interface APIResponse {
  message: string
  code: number
  status: string
  data: QuizQuestion[]
}

export interface SubmitAPIResponse {
  message: string
  code: number
  status: string
}

export interface Violation {
  type: string
  timestamp: string
  questionIndex: number
}

export interface QuizState {
  questions: QuizQuestion[]
  answers: (string[] | number | string | null)[]
  currentQuestionIndex: number
  quizStarted: boolean
  isComplete: boolean
  loading: boolean
  error: string | null
  message: string
  choice: string[]
  typeQuiz: number
  violations: Violation[]
  securityEnabled: boolean
  quizStartTime: null | Date
  quizEndTime: null | Date
}

export interface AnswerStructur {
  soalID: number
  answer: string | number | string[]
}
