<template>
  <div class="bg-slate-200 min-h-screen flex justify-center items-center flex-col">
    <CompletedQuiz :handle-back="() => {}" />
  </div>
</template>

<script setup lang="ts">
import CompletedQuiz from '@/components/QuizForms/CompletedQuiz.vue'
</script>

<style scoped></style>
