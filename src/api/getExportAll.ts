import { useAuthStore } from '@/stores/auth'
import { type PsikogramExportDataInterface } from '@/types/calculateTypes'
import { handleApiResponse, type ApiResponse, type UserData } from '@/utils/apiInterceptor'

export const getExportAll = async (): Promise<PsikogramExportDataInterface> => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    // First, fetch all users to get their IDs
    const usersResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const usersApiResponse: ApiResponse<{ data: UserData[] }> = await handleApiResponse(usersResponse)
    
    if (!usersApiResponse.data?.data || !Array.isArray(usersApiResponse.data.data)) {
      throw new Error('Invalid response format: expected array of users')
    }

    // Extract user IDs from the response
    const userIDs = usersApiResponse.data.data.map((user: UserData) => user.user_id)

    // Now make the export request with all user IDs
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/viewer/export`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userIDs: userIDs,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PsikogramExportDataInterface = await response.json()
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
