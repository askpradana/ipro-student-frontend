import type { CalculateApiResponse } from '@/types/calculateTypes'
import { useAuthStore } from '@/stores/auth'

export const postCalculateUser = async (usersID: string[]) => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  const bodyData = {
    userID: usersID,
  }

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/quizzes/calculate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: CalculateApiResponse = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
