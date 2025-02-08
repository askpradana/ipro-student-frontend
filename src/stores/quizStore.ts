import { defineStore } from 'pinia'

interface Question {
  question: string
  type: string
}

interface QuizState {
  questions: Question[]
  answers: (number | null)[]
  currentQuestionIndex: number
  quizStarted: boolean
  isComplete: boolean
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [
      {
        question: 'I enjoy being the center of attention at social gatherings.',
        type: 'extraversion',
      },
      {
        question: 'I prefer to plan my activities carefully rather than be spontaneous.',
        type: 'conscientiousness',
      },
      {
        question: 'I often worry about things that might go wrong.',
        type: 'neuroticism',
      },
      {
        question: 'I enjoy thinking about abstract concepts and theories.',
        type: 'openness',
      },
      {
        question: "I find it easy to understand and relate to others' feelings.",
        type: 'agreeableness',
      },
    ],
    answers: [],
    currentQuestionIndex: 0,
    quizStarted: false,
    isComplete: false
  }),

  actions: {
    startQuiz() {
      this.quizStarted = true
      this.isComplete = false
      this.answers = new Array(this.questions.length).fill(null)
      this.currentQuestionIndex = 0
    },

    submitAnswer(answer: number) {
      this.answers[this.currentQuestionIndex] = answer
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      } else if (this.answers.every(answer => answer !== null)) {
        this.isComplete = true
      }
    },

    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--
      }
    },

    resetQuiz() {
      this.quizStarted = false
      this.isComplete = false
      this.currentQuestionIndex = 0
      this.answers = []
    },
  },

  getters: {
    currentQuestion: (state): Question | undefined =>
      state.questions[state.currentQuestionIndex],

    progress: (state): number =>
      ((state.answers.filter(a => a !== null).length) / state.questions.length) * 100,
  },
})