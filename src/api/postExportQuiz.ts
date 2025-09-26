import { useAuthStore } from '@/stores/auth'

export interface ExportQuizPayload {
  userIDs: string[]
}

export interface ExportQuizResponse {
  message: string
  code: number
  status: string
  data: {
    results: Array<{
      school: string
      person_data: Array<{
        email: string
        name: string
        grade: string
        phone_number: string
        jurusan: string
        result: Array<{
          skor: number
          aspek: string
          definisi_aspek: string
          hasil: string
        }>
      }>
    }>
  }
}

export const postExportQuiz = async (userIDs: string[]): Promise<ExportQuizResponse> => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  if (!token) {
    throw new Error('No user token found')
  }

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/admin/export`, {
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

  const data: ExportQuizResponse = await response.json()
  return data
}