import { ref } from 'vue'
import type { ResponseGetAPIUser } from '@/types/userTypes'

export const useGetUserProfileApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUserProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const userStore = localStorage.getItem('user')
      if (!userStore) {
        throw new Error('No user token found')
      }

      const user = JSON.parse(userStore)
      const token = user.token

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ResponseGetAPIUser = await response.json()
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
    fetchUserProfile,
  }
}
