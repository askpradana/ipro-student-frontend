import { ref } from 'vue'
import type { ResponseGetAPIUser } from '@/types/userTypes'
import { useAuthStore } from '@/stores/auth'

export const useGetUserProfileApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUserProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const authStore = useAuthStore()
      const token = authStore.user?.token

      if (!token) {
        throw new Error('No user token found')
      }

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
