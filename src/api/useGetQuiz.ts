import { ref } from 'vue'
import type { APIResponse } from '@/types/types'

export const useGetQuizApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const type = localStorage.getItem('type-quiz')
  const getTypeQuiz = () => {
    switch (+type!) {
      case 1:
        return 'soal-tiga'
      case 2:
        return 'soal-lima'
      case 3:
        return 'soal-enam'
      case 4:
        return 'soal-tujuh'
      default:
        break
    }
  }

  const fetchQuestions = async () => {
    loading.value = true
    error.value = null

    try {
      const userStore = localStorage.getItem('user')
      if (!userStore) {
        throw new Error('No user token found')
      }

      const user = JSON.parse(userStore)
      const token = user.token
      const quizType = getTypeQuiz()

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/quiz/${quizType}`, {
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
