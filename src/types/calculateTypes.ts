export interface AssessmentAspect {
  skor: number
  definisi_aspek: string
  deskripsi: string
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
