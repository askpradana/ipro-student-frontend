// admin.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { handleApiResponse, type ApiResponse, type UserData } from '@/utils/apiInterceptor'
import { useAuthStore } from '@/stores/auth'

export interface EditingUser
  extends Omit<User, 'testPeriod' | 'lastLogin' | 'createdAt' | 'testCompletedAt'> {
  testPeriod: string
  lastLogin: string | null
  createdAt: string
  name: string
  testCompletedAt: string | null
}

export interface User {
  id: string
  name: string
  email: string
  grade: string
  school: string
  lastLogin: Date | null
  attemptLogin: number
  testPeriod: Date | null
  testCompletedAt: Date | null
  createdAt: Date
  createdBy: string
}

// const generateMockUsers = (count: number = 51): User[] => {
//   const schools = ['Springfield', 'Bukalapak', 'Tokopedia', 'Gojek', 'Shopee']
//   const grades = ['9', '10', '11', '12']

//   return Array.from({ length: count }, (_, index) => {
//     const testPeriod = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
//     const hasCompleted = Math.random() > 0.5

//     return {
//       id: `USR${String(index + 1).padStart(3, '0')}`,
//       name: `Student ${index + 1}`,
//       email: `student${index + 1}@example.com`,
//       grade: grades[Math.floor(Math.random() * grades.length)],
//       school: schools[Math.floor(Math.random() * schools.length)],
//       lastLogin:
//         Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
//       attemptLogin: Math.floor(Math.random() * 3),
//       testPeriod,
//       testCompletedAt: hasCompleted
//         ? new Date(testPeriod.getTime() + Math.random() * 2 * 60 * 60 * 1000)
//         : null,
//       createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
//       createdBy: 'Admin001',
//     }
//   })
// }

export const useAdminStore = defineStore('admin', () => {
  const users = ref<User[]>([])
  const authStore = useAuthStore()

  const deleteUser = (userId: string): void => {
    const index = users.value.findIndex((user) => user.id === userId)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  const resetAttempts = (userId: string): void => {
    const user = users.value.find((user) => user.id === userId)
    if (user) {
      user.attemptLogin = 0
    }
  }

  // const toggleTest = (userId: string): void => {
  //   const user = users.value.find((user) => user.id === userId)
  //   if (user) {
  //     user.isTestEnabled = !user.isTestEnabled
  //   }
  // }

  const updateUser = async (updatedUser: User): Promise<void> => {
    const index = users.value.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  const resetPassword = async (userId: string): Promise<boolean> => {
    // Implement password reset logic here
    console.log(`Password reset requested for user ${userId}`)
    return true
  }

  const addMultipleUsers = async (newUsers: Partial<User>[]): Promise<void> => {
    // Mock implementation
    const createdUsers = newUsers.map((user, index) => ({
      id: `USR${String(users.value.length + index + 1).padStart(3, '0')}`,
      name: user.name || '',
      email: user.email || '',
      grade: user.grade || '',
      school: user.school || '',
      lastLogin: null,
      attemptLogin: 0,
      testPeriod: user.testPeriod || null,
      testCompletedAt: null,
      createdAt: new Date(),
      createdBy: 'Admin001',
    }))

    users.value = [...users.value, ...createdUsers]

    // API implementation (commented out for future use)
    /*
    try {
      // Assuming you have an API endpoint for adding multiple users
      const response = await axios.post('/api/users/bulk', { users: newUsers })
      // Update the local store with the new users
      users.value = [...users.value, ...response.data]
    } catch (error) {
      console.error('Error adding multiple users:', error)
      throw error
    }
    */
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${authStore.user?.token}`,
        },
      })
      const apiResponse: ApiResponse<{ data: UserData[] }> = await handleApiResponse(response)

      if (!apiResponse.data?.data || !Array.isArray(apiResponse.data.data)) {
        throw new Error('Invalid response format: expected array of users')
      }

      users.value = apiResponse.data.data.map(
        // TODO bikin logout kalau token invalid
        (apiUser: UserData): User => ({
          id: apiUser.user_id,
          name: apiUser.name || ' - ',
          email: apiUser.email || ' - ',
          grade: apiUser.grade || ' - ',
          school: apiUser.school || ' - ',
          lastLogin:
            apiUser.last_login !== '0001-01-01T00:00:00Z' ? new Date(apiUser.last_login) : null,
          attemptLogin: apiUser.attempt_login,
          testPeriod:
            apiUser.quiz_period !== '0001-01-01T00:00:00Z' ? new Date(apiUser.quiz_period) : null,
          testCompletedAt:
            apiUser.quiz_completed_at !== '0001-01-01T00:00:00Z'
              ? new Date(apiUser.quiz_completed_at)
              : null,
          createdAt: new Date(apiUser.created_at),
          createdBy: apiUser.created_by,
        }),
      )
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const updateUserApi = async (user: User) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authStore.user?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      return await handleApiResponse(response)
    } catch (error) {
      throw error
    }
  }

  return {
    users,
    deleteUser,
    resetAttempts,
    // toggleTest,
    updateUser,
    resetPassword,
    addMultipleUsers,
    fetchUsers,
    updateUserApi,
  }
})
