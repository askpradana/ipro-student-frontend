export interface UserProfileData {
  name: string
  email: string
  grade: string
  school: string
  agreeDisclaimer: {
    Time: string
    Valid: boolean
  }
  quiz_tiga: boolean
  quiz_lima: boolean
  quiz_enam: boolean
  quiz_tujuh: boolean
  quiz_ppi: boolean
  quiz_riasec: boolean
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
  quiz_riasec: boolean
  loading: boolean
  error: string | null
  dateAgreement: string
  discalaimerAgreement: boolean
}
