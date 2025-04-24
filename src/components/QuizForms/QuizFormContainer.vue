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
    <template v-else-if="typeQuiz == '4'">
      <QuizSevenForm />
    </template>
    <template v-else-if="typeQuiz == '5'">
      <QuizPPIForm />
    </template>
    <template v-else-if="typeQuiz == '6'">
      <QuizRiasecForm />
    </template>
  </template>
</template>

<script setup lang="ts">
import QuizThreeForm from './QuizThreeForm.vue'
import QuizFiveForm from './QuizFiveForm.vue'
import QuizSixForm from './QuizSixForm.vue'
import QuizSevenForm from './QuizSevenForm.vue'
import QuizPPIForm from './QuizPPIForm.vue'
import QuizRiasecForm from './QuizRiasecForm.vue'
// import ProgressBar from '@/components/QuizForms/ProgressBar.vue'
import GetQuizSkeleton from '../skeletons/GetQuizSkeleton.vue'
import { useQuizStore } from '@/stores/quizStore'
import TypeQuizData from '@/data/type-quiz.json'

const quizStore = useQuizStore()
const typeQuiz = localStorage.getItem('type-quiz')

const getTitle = () => {
  const quizType = TypeQuizData.find((q) => q.typeQuiz === +typeQuiz!)
  return quizType?.title || 'Tes'
}
</script>

<style scoped></style>
