<template>
  <!-- <GetQuizSkeleton /> -->
  <GetQuizSkeleton v-if="quizStore.loading" />

  <template v-else>
    <h1 class="font-bold mb-8 text-xl md:text-2xl">{{ getTitle() }}</h1>
    <!-- <ProgressBar /> -->
    <template v-if="typeQuiz == '1'">
      <QuizThreeForm />
    </template>
    <template v-else-if="typeQuiz == '2'">
      <QuizFiveForm />
    </template>
    <template v-else-if="typeQuiz == '3'">
      <QuizSixForm />
    </template>
    <template v-else>
      <QuizSevenForm />
    </template>
  </template>
</template>

<script setup lang="ts">
import QuizThreeForm from './QuizThreeForm.vue'
import QuizFiveForm from './QuizFiveForm.vue'
import QuizSixForm from './QuizSixForm.vue'
import QuizSevenForm from './QuizSevenForm.vue'
// import ProgressBar from '@/components/QuizForms/ProgressBar.vue'
import GetQuizSkeleton from '../skeletons/GetQuizSkeleton.vue'
import { useQuizStore } from '@/stores/quizStore'

const quizStore = useQuizStore()
const typeQuiz = localStorage.getItem('type-quiz')

const getTitle = () => {
  switch (typeQuiz) {
    case '1':
      return 'Quiz 3'
    case '2':
      return 'Quiz 5'
    case '3':
      return 'Quiz 6'
    case '4':
      return 'Quiz 7'

    default:
      break
  }
}
</script>

<style scoped></style>
