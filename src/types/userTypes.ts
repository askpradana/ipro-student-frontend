export interface UserProfileData {
  name: string
  email: string
  grade: string
  school: string
  quiz_tiga: boolean
  quiz_lima: boolean
  quiz_enam: boolean
  quiz_tujuh: boolean
  quiz_ppi: boolean
  quiz_period: {
    String: string
    Valid: boolean
  }
}

export interface ResponseGetAPIUser {
  message: string
  code: number
  status: string
  data: UserProfileData
}

export interface UserState {
  dataUser: UserProfileData | null
  quiz_tiga: boolean
  quiz_lima: boolean
  quiz_enam: boolean
  quiz_tujuh: boolean
  quiz_ppi: boolean
  loading: boolean
  error: string | null
}
