import { useAuthStore } from '@/stores/auth'

export interface ExportRiasecPayload {
  userIDs: string[]
}

export interface ExportRiasecResponse {
  message: string
  code: number
  status: string
  data: {
    school: string
    person_data: Array<{
      email: string
      name: string
      grade: string
      phone_number: string
      jurusan: string
      result: {
        kepribadian: string
        karir: string
        pendidikan: string
        potensi: string
        scores: {
          realistic: number
          investigative: number
          artistic: number
          social: number
          enterprising: number
          conventional: number
        }
        top_three: string
      }
    }>
    skipped_users: string[]
  }
}

export const postExportRiasec = async (userIDs: string[]): Promise<ExportRiasecResponse> => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  if (!token) {
    throw new Error('No user token found')
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/riasec/export`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userIDs }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: ExportRiasecResponse = await response.json()
  return data
}