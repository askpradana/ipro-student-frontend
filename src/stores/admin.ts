// admin.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleApiResponse, type ApiResponse, type UserData } from '@/utils/apiInterceptor'
import { useAuthStore } from '@/stores/auth'

export interface EditingUser extends Omit<User, 'testPeriod' | 'lastLogin' | 'createdAt'> {
  testPeriod: string
  lastLogin: string | null
  createdAt: string
  name: string
}

export interface User {
  id: string
  name: string
  email: string
  grade: string
  school: string
  jurusan?: string
  lastLogin: Date | null
  attemptLogin: number
  testPeriod: Date | null
  createdAt: Date
  createdBy: string
  phoneNumber?: string
  quizStatus: {
    tiga: boolean
    lima: boolean
    enam: boolean
    tujuh: boolean
    ppi: boolean
  }
}

export const useAdminStore = defineStore('admin', () => {
  const users = ref<User[]>([])
  const authStore = useAuthStore()

  const deleteUser = (userId: string): void => {
    const index = users.value.findIndex((user) => user.id === userId)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  interface NewViewer {
    email: string
    name: string
    phoneNumber: string
  }

  const addMultipleUsers = async (
    newUsers: Partial<User>[],
    viewers: NewViewer[],
  ): Promise<void> => {
    try {
      const requestBody = {
        school: newUsers[0].school,
        period: newUsers[0].testPeriod,
        users: newUsers.map((user) => ({
          email: user.email,
          name: user.name,
          grade: user.grade,
          jurusan: user.jurusan,
          phoneNumber: user.phoneNumber || '',
        })),
        viewer: viewers.map((viewer) => ({
          email: viewer.email,
          name: viewer.name,
          phoneNumber: viewer.phoneNumber || '',
        })),
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/batch`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()

      if (response.status === 409) {
        throw new Error(data.message)
      }

      if (!response.ok) {
        throw new Error('Failed to add users. Please try again.')
      }

      // Refresh users list after successful addition
      await fetchUsers()
    } catch (error) {
      console.error('Error adding users:', error)
      throw error
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
        headers: {
          Authorization: `Bearer ${authStore.user?.token}`,
        },
      })
      const apiResponse: ApiResponse<{ data: UserData[] }> = await handleApiResponse(response)

      if (!apiResponse.data?.data || !Array.isArray(apiResponse.data.data)) {
        throw new Error('Invalid response format: expected array of users')
      }

      users.value = apiResponse.data.data.map(
        (apiUser: UserData): User => ({
          id: apiUser.user_id,
          name: apiUser.name || ' - ',
          email: apiUser.email || ' - ',
          grade: apiUser.grade || ' - ',
          school: apiUser.school || ' - ',
          jurusan: apiUser.jurusan || ' - ',
          lastLogin:
            apiUser.last_login !== '0001-01-01T00:00:00Z' ? new Date(apiUser.last_login) : null,
          attemptLogin: apiUser.attempt_login,
          testPeriod:
            apiUser.quiz_period !== '0001-01-01T00:00:00Z' ? new Date(apiUser.quiz_period) : null,
          createdAt: new Date(apiUser.created_at),
          createdBy: apiUser.created_by,
          phoneNumber: apiUser.phone_number,
          quizStatus: apiUser.quiz_status,
        }),
      )
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const updateUserApi = async (user: EditingUser) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          name: user.name,
          email: user.email,
          grade: user.grade,
          quiz_period: user.testPeriod,
        }),
      })

      return await handleApiResponse(response)
    } catch (error) {
      throw error
    }
  }

  return {
    users,
    deleteUser,
    addMultipleUsers,
    fetchUsers,
    updateUserApi,
  }
})
