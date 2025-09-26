// admin.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleApiResponse, type ApiResponse, type UserData } from '@/utils/apiInterceptor'
import { useAuthStore } from '@/stores/auth'
import { postExportQuiz, type ExportQuizResponse } from '@/api/postExportQuiz'
import { postExportRiasec, type ExportRiasecResponse } from '@/api/postExportRiasec'

export interface EditingUser extends Omit<User, 'lastLogin' | 'createdAt'> {
  lastLogin: string | null
  createdAt: string
  name: string
}

export interface QuizStatus {
  QUIZ3: boolean
  QUIZ5: boolean
  QUIZ6: boolean
  QUIZ7: boolean
  PPI: boolean
  RIASEC: boolean
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
  createdAt: Date
  createdBy: string
  phoneNumber?: string
  quizStatus: QuizStatus
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


  const addMultipleUsers = async (
    newUsers: Partial<User>[],
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
      const apiResponse: ApiResponse<UserData[]> = await handleApiResponse(response)

      // Handle case where data is null (empty result set)
      if (apiResponse.data === null) {
        users.value = []
        return
      }

      if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
        throw new Error('Invalid response format: expected array of users')
      }

      users.value = apiResponse.data.map(
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
          createdAt: new Date(apiUser.created_at),
          createdBy: apiUser.created_by,
          phoneNumber: apiUser.phone_number,
          quizStatus: {
            QUIZ3: apiUser.quiz_status?.QUIZ3 || false,
            QUIZ5: apiUser.quiz_status?.QUIZ5 || false,
            QUIZ6: apiUser.quiz_status?.QUIZ6 || false,
            QUIZ7: apiUser.quiz_status?.QUIZ7 || false,
            PPI: apiUser.quiz_status?.PPI || false,
            RIASEC: apiUser.quiz_status?.RIASEC || false,
          },
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
        }),
      })

      return await handleApiResponse(response)
    } catch (error) {
      throw error
    }
  }

  const exportQuizData = async (userIDs: string[]): Promise<ExportQuizResponse> => {
    try {
      return await postExportQuiz(userIDs)
    } catch (error) {
      console.error('Error exporting quiz data:', error)
      throw error
    }
  }

  const exportRiasecData = async (userIDs: string[]): Promise<ExportRiasecResponse> => {
    try {
      return await postExportRiasec(userIDs)
    } catch (error) {
      console.error('Error exporting RIASEC data:', error)
      throw error
    }
  }

  return {
    users,
    deleteUser,
    addMultipleUsers,
    fetchUsers,
    updateUserApi,
    exportQuizData,
    exportRiasecData,
  }
})
