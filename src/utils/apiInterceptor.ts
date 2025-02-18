import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export interface UserData {
  user_id: string
  email: string
  attempt_login: number
  created_by: string
  created_at: string
  last_login: string
  name: string
  grade: string
  school: string
  quiz_period: string
  quiz_completed_at: string
}

export interface AuthModel {
  role: string
  token: string
}

export interface ApiResponse<T> {
  message: string
  code: number
  status: string
  data?: T
}

export async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const data: ApiResponse<T> = await response.json()

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
