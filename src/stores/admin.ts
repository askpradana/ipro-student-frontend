// admin.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  lastLogin: Date | null
  attemptLogin: number
  testPeriod: Date | null
  isTestEnabled: boolean
  createdAt: Date
  createdBy: string
}

export const useAdminStore = defineStore('admin', () => {
  const users = ref<User[]>([
    {
      id: 'USR001',
      name: 'Student 1',
      email: 'student1@example.com',
      grade: '9',
      school: 'Bukalapak',
      lastLogin: new Date('2024-03-15T22:30:00'),
      attemptLogin: 2,
      testPeriod: new Date('2024-03-15T22:30:00'),
      isTestEnabled: true,
      createdAt: new Date('2024-03-15T22:30:00'),
      createdBy: 'Admin User',
    },
    {
      id: 'USR002',
      name: 'Student 2',
      email: 'student2@example.com',
      grade: '9',
      school: 'Springfield',
      lastLogin: new Date('2024-03-15T22:30:00'),
      attemptLogin: 0,
      testPeriod: new Date('2024-03-15T22:30:00'),
      isTestEnabled: true,
      createdAt: new Date('2024-03-15T22:30:00'),
      createdBy: 'Admin User',
    },
    {
      id: 'USR003',
      name: 'Prikitiw 1',
      email: 'prikitiw@mail.com',
      grade: '9',
      school: 'Springfield',
      lastLogin: new Date('2024-03-15T22:30:00'),
      attemptLogin: 0,
      testPeriod: new Date('2024-03-15T22:30:00'),
      isTestEnabled: true,
      createdAt: new Date('2024-03-15T22:30:00'),
      createdBy: 'Admin User',
    },
  ])

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

  const toggleTest = (userId: string): void => {
    const user = users.value.find((user) => user.id === userId)
    if (user) {
      user.isTestEnabled = !user.isTestEnabled
    }
  }

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
    toggleTest,
    updateUser,
    resetPassword,
  }
})
