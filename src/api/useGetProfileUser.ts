import { ref } from 'vue'
import type { ResponseGetAPIUser, UserProfileData } from '@/types/userTypes'
import { useAuthStore } from '@/stores/auth'

export const useGetUserProfileApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const mapCompletedQuizzesToBooleans = (data: ResponseGetAPIUser['data']): UserProfileData => {
    const completedQuizzes = data.completed_quizzes || []

    return {
      ...data,
      quiz_privileges: data.quiz_privileges || 'none',
      quiz_tiga: data.quiz_tiga !== undefined ? data.quiz_tiga : completedQuizzes.includes('QUIZ3'),
      quiz_lima: data.quiz_lima !== undefined ? data.quiz_lima : completedQuizzes.includes('QUIZ5'),
      quiz_enam: data.quiz_enam !== undefined ? data.quiz_enam : completedQuizzes.includes('QUIZ6'),
      quiz_tujuh:
        data.quiz_tujuh !== undefined ? data.quiz_tujuh : completedQuizzes.includes('QUIZ7'),
      quiz_ppi: data.quiz_ppi !== undefined ? data.quiz_ppi : completedQuizzes.includes('PPI'),
      quiz_riasec:
        data.quiz_riasec !== undefined ? data.quiz_riasec : completedQuizzes.includes('RIASEC'),
    }
  }

  const fetchUserProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const authStore = useAuthStore()

      // First verify token access is ready
      if (!authStore.verifyTokenAccess()) {
        console.log('Token not immediately available, waiting...')

        // Wait for token to be available
        const token = await authStore.waitForToken(5000)

        if (!token) {
          throw new Error('No user token found after waiting - user must be authenticated')
        }

        console.log('Token became available after waiting')
      }

      // Get token using the safe getter
      const token = authStore.getToken

      if (!token) {
        throw new Error('No user token found - user must be authenticated')
      }

      console.log('Fetching user profile with token:', token.substring(0, 20) + '...')

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          console.error('401 Unauthorized - token may be invalid or expired')
          // Clear auth state if token is invalid
          authStore.clearAuthState()
          throw new Error('Authentication failed - please login again')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ResponseGetAPIUser = await response.json()
      console.log('User profile fetched successfully')
      return mapCompletedQuizzesToBooleans(data.data)
    } catch (e) {
      console.error('Error fetching user profile:', e)
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    fetchUserProfile,
  }
}
