<template>
  <div class="bg-white p-8 rounded-xl flex justify-center items-center flex-col shadow-lg mx-2">
    <h2 class="text-2xl font-bold text-slate-800 mb-4">Penilaian Selesai!</h2>
    <p class="text-slate-600 mb-6 text-center">
      Terima kasih telah menyelesaikan penilaian. Hasil Anda sedang diproses.
      <br />
      Jika Anda ingin mengikuti Tes ini lagi, silakan hubungi admin.
    </p>
    <div class="space-x-4 flex">
      <button
        @click="handleBackToDashboard"
        class="text-sm md:text-base px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
      >
        Kembali ke Dashboard
      </button>
      <!-- <button
        @click="quizStore.resetQuiz"
        class="text-sm md:text-base px-6 py-3 rounded-lg font-semibold border border-teal-600 text-teal-600 hover:bg-teal-50 transition-all duration-300"
      >
        Take Again
      </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useQuizStore } from '@/stores/quizStore'
import { useRouter } from 'vue-router'

const router = useRouter()
// const quizStore = useQuizStore()

const handleBackToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped></style>
