import { useAuthStore } from '@/stores/auth'

export interface DisclaimerRespondInterface {
  message: string
  code: number
  status: string
  data: boolean
}

// Check disclaimer agreement status
export const checkDisclaimerStatus = async () => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/disclaimer`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DisclaimerRespondInterface = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

// Set disclaimer agreement (when user clicks agree)
export const setDisclaimerAgreement = async () => {
  const authStore = useAuthStore()
  const token = authStore.user?.token

  try {
    if (!token) {
      throw new Error('No user token found')
    }

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/disclaimer/agree`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DisclaimerRespondInterface = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

// Keep old function name for backward compatibility temporarily
export const getDisclaimerAgreement = setDisclaimerAgreement
