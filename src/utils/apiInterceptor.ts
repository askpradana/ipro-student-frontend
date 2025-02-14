import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

interface ApiResponse {
  message: string
  code: number
  status: string
}

export async function handleApiResponse(response: Response) {
  const data: ApiResponse = await response.json()

  if (data.code === 401 && data.message === 'token not found or invalidated') {
    const authStore = useAuthStore()
    const router = useRouter()

    // Clear auth state
    authStore.user = null
    authStore.isAuthenticated = false
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')

    // Redirect to login
    router.push('/login')

    throw new Error('Session expired. Please login again.')
  }

  return data
}
