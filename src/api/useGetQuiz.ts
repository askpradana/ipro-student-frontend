import { ref } from 'vue'
import type { APIResponse } from '@/types/quizTypes'
import { getTypeQuiz } from '@/lib/getTypeQuiz'
import { useAuthStore } from '@/stores/auth'

export const useGetQuizApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const type = localStorage.getItem('type-quiz')

  const fetchQuestions = async () => {
    loading.value = true
    error.value = null

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
