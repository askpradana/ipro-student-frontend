import { defineStore } from 'pinia'
import type { UserState } from '@/types/userTypes'
import { useGetUserProfileApi } from '@/api/useGetProfileUser'

export const useUserStores = defineStore('user', {
  state: (): UserState => ({
    dataUser: null,
    loading: false,
    error: null,
    quiz_tiga: false,
    quiz_lima: false,
    quiz_enam: false,
    quiz_tujuh: false,
    quiz_ppi: false,
    quiz_riasec: false,
    dateAgreement: '',
    discalaimerAgreement: false,
  }),

  actions: {
    async initializeQuiz() {
      const { fetchUserProfile } = useGetUserProfileApi()
      this.loading = true
      this.error = null

      try {
        const userProfile = await fetchUserProfile()
        this.dataUser = userProfile
        this.quiz_tiga = userProfile.quiz_tiga
        this.quiz_lima = userProfile.quiz_lima
        this.quiz_enam = userProfile.quiz_enam
        this.quiz_tujuh = userProfile.quiz_tujuh
        this.quiz_ppi = userProfile.quiz_ppi
        this.quiz_riasec = userProfile.quiz_riasec
        this.dateAgreement = userProfile.agreeDisclaimer.Time
        this.discalaimerAgreement = userProfile.agreeDisclaimer.Valid
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to load questions'
      } finally {
        this.loading = false
      }
    },
  },
  getters: {},
})
