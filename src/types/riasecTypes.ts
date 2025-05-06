export interface TriasecResult {
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

export interface PersonData {
  email: string
  name: string
  grade: string
  phone_number: string
  jurusan: string
  quiz_period: string
  result: TriasecResult
}

export interface RiasecDataInterface {
  message: string
  code: number
  status: string
  data: {
    school: string
    person_data: PersonData[]
    skipped_users: string[]
  }
}
