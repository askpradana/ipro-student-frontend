import { useAuthStore } from '@/stores/auth'
import type { NewUser, NewViewer } from '@/types/formNewUserTypes'

interface BodyDataInterface {
  school: string
  users: NewUser[]
  viewer: NewViewer[]
}

interface APIResponse {
  code: number
  message: string
  status: string
}

export const postNewStudents = async (dataProps: BodyDataInterface) => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  const bodyData: BodyDataInterface = {
    school: dataProps.school,
    users: dataProps.users,
    viewer: dataProps.viewer,
  }

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users/add-more`, {
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

    const data: APIResponse = await response.json()

    return data
  } catch (err) {
    console.error(err)
  }
}
