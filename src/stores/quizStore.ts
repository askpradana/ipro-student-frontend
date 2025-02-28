import { defineStore } from 'pinia'
import { useGetQuizApi } from '@/api/useGetQuiz'
import { usePostAnswerApi } from '@/api/usePostAnswers'
import type { QuizQuestion, QuizState, Violation } from '@/types/quizTypes'

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

    violations: [], // akan berisi pelanggaran yang terdeteksi
    securityEnabled: true, // untuk mengaktifkan/menonaktifkan fitur keamanan
    quizStartTime: null, // untuk pencatatan waktu
    quizEndTime: null, //
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
      this.violations = [] // Reset violations
      this.quizStartTime = new Date() //  Catat waktu mulai
    },

    submitAnswer(answer: number | string | string[]) {
      this.answers[this.currentQuestionIndex] = answer
    },

    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
      } else if (this.answers.every((answer) => answer !== null)) {
        this.isComplete = true
        this.quizEndTime = new Date() // Catat waktu selesai
        console.log(this.violations)

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
      this.violations = [] // Reset violations
      this.quizStartTime = null
      this.quizEndTime = null
      localStorage.removeItem('type-quiz')
    },

    recordViolation(violation: Violation) {
      // Hanya catat pelanggaran jika fitur keamanan diaktifkan
      if (this.securityEnabled) {
        this.violations.push(violation)

        // Opsional: Kirim pelanggaran ke server secara real-time
        // Misalnya menggunakan websocket atau API call
        this.logViolationToServer(violation)
      }
    },

    // Metode untuk mengirim log pelanggaran ke server (implementasi bergantung pada API Anda)
    async logViolationToServer(violation: Violation) {
      console.log(violation)

      // Implementasi ini bergantung pada API yang Anda miliki
      // Contoh implementasi:
      /*
      try {
        await fetch('/api/quiz/violation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            violation,
            quizId: 'quiz-id-disini', // Dari state atau props
            userId: 'user-id-disini', // Dari auth store
          }),
        })
      } catch (error) {
        console.error('Failed to log violation:', error)
      }
      */
    },

    // Toggle fitur keamanan
    toggleSecurity(enabled: boolean) {
      this.securityEnabled = enabled
    },
  },

  getters: {
    currentQuestion: (state): QuizQuestion | undefined =>
      state.questions[state.currentQuestionIndex],

    progress: (state): number =>
      (state.answers.filter((a) => a !== null).length / state.questions.length) * 100,

    // Tambahkan getters baru untuk fitur keamanan
    hasViolations: (state) => state.violations.length > 0,
    violationCount: (state) => state.violations.length,

    // Mendapatkan durasi quiz dalam detik
    quizDuration: (state) => {
      if (!state.quizStartTime) return 0
      const end = state.quizEndTime || new Date()
      return Math.floor((end.getTime() - state.quizStartTime.getTime()) / 1000)
    },

    // Mendapatkan daftar semua jenis pelanggaran
    violationTypes: (state) => {
      const types = {} as Record<string, number>
      state.violations.forEach((v) => {
        types[v.type] = (types[v.type] || 0) + 1
      })
      return types
    },
  },
})
