<template>
  <h2 class="text-2xl font-bold text-slate-800 mb-4">Assessment Complete!</h2>
  <p class="text-slate-600 mb-8">
    Thank you for completing the assessment. Your results are being processed.
  </p>
  <div class="space-x-4">
    <button
      @click="handleBack"
      class="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
    >
      Back to Dashboard
    </button>
    <button
      @click="quizStore.resetQuiz"
      class="px-6 py-3 rounded-lg font-semibold text-teal-600 hover:bg-teal-50 transition-all duration-300"
    >
      Take Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore'

const { handleBack } = defineProps<{ handleBack: () => void }>()
const quizStore = useQuizStore()

console.log(quizStore)
</script>

<style scoped></style>
