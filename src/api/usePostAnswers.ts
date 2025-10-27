import { ref } from 'vue'
import { changeStructur } from '@/lib/changeAnswerStructur'
import type { SubmitAPIResponse } from '@/types/quizTypes'
import { getTypeQuiz } from '@/lib/getTypeQuiz'
import { useAuthStore } from '@/stores/auth'

export const usePostAnswerApi = (answers: (string | number | string[] | null)[]) => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const type = localStorage.getItem('type-quiz')
  const dataAnswer = {
    data: changeStructur(answers),
  }
  const authStore = useAuthStore()

  const postAnswer = async () => {
    loading.value = true
    error.value = null

    try {
      const token = authStore.getToken
      if (!token) {
        throw new Error('No user token found')
      }

      const quizType = getTypeQuiz(type!)

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/quizzes/${quizType}/answers`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataAnswer),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: SubmitAPIResponse = await response.json()
      return data
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
    postAnswer,
  }
}
