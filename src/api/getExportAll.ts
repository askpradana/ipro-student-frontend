import { useAuthStore } from '@/stores/auth'
import { type PsikogramExportDataInterface } from '@/types/calculateTypes'

export const getExportAll = async () => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/export`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: PsikogramExportDataInterface = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
