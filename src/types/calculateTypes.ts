export interface AssessmentAspect {
  aspek: string
  skor: number
  definisi_aspek: string
  hasil: string
}

export interface UserAssessment {
  kecerdasan_umum: AssessmentAspect
  penalaran_numerik: AssessmentAspect
  penalaran_verbal: AssessmentAspect
  penalaran_non_verbal: AssessmentAspect
  kecepatan_perseptual: AssessmentAspect
  ketelitian_kerja: AssessmentAspect
  sistematik_kerja: AssessmentAspect
  ketangguhan: AssessmentAspect
  penyesuaian_diri: AssessmentAspect
  hubungan_interpersonal: AssessmentAspect
  motivasi_berprestasi: AssessmentAspect
  kemandirian: AssessmentAspect
}

export interface PsikogramData {
  [userId: string]: UserAssessment
}

export interface CalculateApiResponse {
  message: string
  code: number
  status: string
  data: PsikogramData
}

export interface CognitiveAspectsInterface {
  kecerdasan_umum: AssessmentAspect
  penalaran_numerik: AssessmentAspect
  penalaran_verbal: AssessmentAspect
  penalaran_non_verbal: AssessmentAspect
  kecepatan_perseptual: AssessmentAspect
  ketelitian_kerja: AssessmentAspect
}

export interface PsikogramExportDataInterface {
  message: string
  code: number
  status: string
  data: {
    results: {
      school: string
      person_data: {
        email: string
        name: string
        grade: string
        phone_number: string
        quiz_period: string | null
        jurusan: string
        result: AssessmentAspect[]
      }[]
    }[]
  }
}
