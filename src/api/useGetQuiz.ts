import { ref } from 'vue'
import type { APIResponse } from '@/types/quizTypes'
import { getTypeQuiz } from '@/lib/getTypeQuiz'
import { useAuthStore } from '@/stores/auth'
import Training3 from '@/data/training-quiz-3.json'
import Training5 from '@/data/training-quiz-5.json'
import Training6 from '@/data/training-quiz-6.json'
import Training7 from '@/data/training-quiz-7.json'
import TrainingPPI from '@/data/training-quiz-ppi.json'

export const useGetQuizApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const type = localStorage.getItem('type-quiz')
  const isTrainingTest = localStorage.getItem('isTraining')

  const fetchQuestions = async () => {
    loading.value = true
    error.value = null
    if (isTrainingTest == 'true') {
      if (type == '1') return Training3.data
      if (type == '2') return Training5.data
      if (type == '3') return Training6.data
      if (type == '4') return Training7.data
      if (type == '5') return TrainingPPI.data
    }

    try {
      const userStore = useAuthStore()
      const token = userStore.user?.token

      if (!token) {
        throw new Error('No user token found')
      }
      const quizType = getTypeQuiz(type!)

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/quizzes/${quizType}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: APIResponse = await response.json()

      return data.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchQuestions,
  }
}
