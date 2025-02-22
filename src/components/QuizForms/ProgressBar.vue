<template>
  <div class="w-full bg-slate-200 rounded-full h-2 mb-8">
    <div
      class="h-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300"
      :style="{ width: `${store.progress}%` }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore'
const store = useQuizStore()
</script>

<style scoped></style>
