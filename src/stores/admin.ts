// admin.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

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

const generateMockUsers = (count: number = 51): User[] => {
  const schools = ['Springfield', 'Bukalapak', 'Tokopedia', 'Gojek', 'Shopee']
  const grades = ['9', '10', '11', '12']

  return Array.from({ length: count }, (_, index) => {
    const testPeriod = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    const hasCompleted = Math.random() > 0.5

    return {
      id: `USR${String(index + 1).padStart(3, '0')}`,
      name: `Student ${index + 1}`,
      email: `student${index + 1}@example.com`,
      grade: grades[Math.floor(Math.random() * grades.length)],
      school: schools[Math.floor(Math.random() * schools.length)],
      lastLogin:
        Math.random() > 0.3 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
      attemptLogin: Math.floor(Math.random() * 3),
      testPeriod,
      testCompletedAt: hasCompleted
        ? new Date(testPeriod.getTime() + Math.random() * 2 * 60 * 60 * 1000)
        : null,
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
      createdBy: 'Admin001',
    }
  })
}

export const useAdminStore = defineStore('admin', () => {
  const users = ref<User[]>(generateMockUsers())

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

  return {
    users,
    deleteUser,
    resetAttempts,
    // toggleTest,
    updateUser,
    resetPassword,
  }
})
