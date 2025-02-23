<template>
  <div class="bg-white p-8 rounded-xl flex justify-center items-center flex-col shadow-lg mx-2">
    <h2 class="text-2xl font-bold text-slate-800 mb-4">Assessment Complete!</h2>
    <p class="text-slate-600 mb-6 text-center">
      Thank you for completing the assessment. Your results are being processed.
      <br />
      If you want to take this quiz again, please contact the admin.
    </p>
    <div class="space-x-4 flex">
      <button
        @click="handleBackToDashboard"
        class="text-sm md:text-base px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
      >
        Back to Dashboard
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
