import { defineStore } from 'pinia'
import { useGetQuizApi } from '@/api/useGetQuiz'
import { usePostAnswerApi } from '@/api/usePostAnswers'
import type { QuizQuestion, QuizState } from '@/types/quizTypes'

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: [],
    answers: [],
    currentQuestionIndex: 0,
    quizStarted: false,
    isComplete: false,
    loading: false,
    error: null,
    message: '',
    choice: [],
    typeQuiz: 0,
  }),

  actions: {
    async initializeQuiz() {
      const { fetchQuestions } = useGetQuizApi()
      this.loading = true
      this.error = null

      try {
        const questions = await fetchQuestions()
        this.questions = questions
        this.answers = new Array(questions.length).fill(null)
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load questions'
      } finally {
        this.loading = false
      }
    },

    async submitFinalAnswer() {
      const { postAnswer } = await usePostAnswerApi(this.answers)
      this.loading = true
      this.error = null

      try {
        const data = await postAnswer()
        this.message = data.message
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to Submit Answer'
      } finally {
        this.loading = false
      }
    },

    startQuiz(typeQuiz: number) {
      this.initializeQuiz()
      this.typeQuiz = typeQuiz
      this.quizStarted = true
      this.isComplete = false
      this.answers = new Array(this.questions.length).fill(null)
      this.currentQuestionIndex = 0
    },

    submitAnswer(answer: number | string | string[]) {
      this.answers[this.currentQuestionIndex] = answer
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      } else if (this.answers.every((answer) => answer !== null)) {
        this.isComplete = true
        // this.typeQuiz = 0
        // localStorage.removeItem('type-quiz')
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
      this.typeQuiz = 0
      localStorage.removeItem('type-quiz')
    },
  },

  getters: {
    currentQuestion: (state): QuizQuestion | undefined =>
      state.questions[state.currentQuestionIndex],

    progress: (state): number =>
      (state.answers.filter((a) => a !== null).length / state.questions.length) * 100,
  },
})
