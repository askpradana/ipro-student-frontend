<template>
  <div class="flex items-center justify-center">
    <span class="text-sm font-medium" :class="summaryTextColor">
      {{ getCompletedQuizList }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { QuizStatus } from '@/stores/admin'

interface Props {
  quizStatus: QuizStatus
}

const props = defineProps<Props>()

const quizDisplayNames = {
  QUIZ3: '3',
  QUIZ5: '5',
  QUIZ6: '6',
  QUIZ7: '7',
  PPI: 'PPI',
  RIASEC: 'RIASEC'
} as const

const getCompletedQuizList = computed(() => {
  const completed = Object.entries(props.quizStatus)
    .filter(([_, isCompleted]) => isCompleted)
    .map(([quiz, _]) => quizDisplayNames[quiz as keyof QuizStatus])

  if (completed.length === 0) {
    return 'Not started yet'
  }

  return completed.join(', ')
})

const summaryTextColor = computed(() => {
  const completedCount = Object.values(props.quizStatus).filter(Boolean).length
  const totalQuizzes = Object.keys(props.quizStatus).length

  if (completedCount === totalQuizzes) {
    return 'text-teal-600' // All completed
  } else if (completedCount > 0) {
    return 'text-amber-600' // Partial
  }
  return 'text-gray-500' // None started
})
</script>