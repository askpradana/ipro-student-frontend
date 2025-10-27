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

      // Use the getter instead of direct property access
      const token = authStore.getToken

      if (!token) {
        throw new Error('No user token found - user must be authenticated')
      }

      console.log('Updating user profile with token:', token.substring(0, 20) + '...')

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        if (response.status === 401) {
          console.error('401 Unauthorized - token may be invalid or expired')
          // Clear auth state if token is invalid
          authStore.clearAuthState()
          throw new Error('Authentication failed - please login again')
        }
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data: UpdateProfileResponse = await response.json()

      if (data.status === 'error') {
        throw new Error(data.message || 'Profile update failed')
      }

      console.log('User profile updated successfully')
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
