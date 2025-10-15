import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface UpdateProfileData {
  name: string
  grade: string
  school: string
  jurusan: string
}

interface UpdateProfileResponse {
  message: string
  code: number
  status: string
}

export const useUpdateProfileApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const updateProfile = async (profileData: UpdateProfileData) => {
    loading.value = true
    error.value = null

    try {
      const authStore = useAuthStore()
      const token = authStore.user?.token

      if (!token) {
        throw new Error('No user token found')
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: UpdateProfileResponse = await response.json()

      if (data.status === 'error') {
        throw new Error(data.message || 'Profile update failed')
      }

      return data
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : 'An error occurred while updating profile'
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    updateProfile,
  }
}
