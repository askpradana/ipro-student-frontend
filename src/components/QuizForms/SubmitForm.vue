<template>
  <h2 class="text-2xl font-bold mb-4 text-teal-600">All answers are filled</h2>
  <p class="text-slate-600 mb-8">
    All answers have been filled, are you sure want to collect answers and end the quiz session?
  </p>
  <div v-if="!isDone" class="space-x-4">
    <button
      :disabled="quizStore.loading"
      @click="backToQuizForm"
      class="px-6 py-3 rounded-lg font-semibold border border-teal-700 text-teal-600 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
      :class="isDone ? 'hidden' : ''"
    >
      Check answer
    </button>
    <button
      :disabled="quizStore.loading"
      @click="sumbitQuizHandler"
      class="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
      :class="isDone ? 'hidden' : ''"
    >
      Submit
    </button>
  </div>
  <div v-else class="space-x-4">
    <button
      :disabled="quizStore.loading"
      class="px-6 py-3 rounded-lg font-semibold border border-teal-700 text-teal-600 hover:border-teal-500 hover:bg-teal-50 transition-all duration-300"
    >
      Already Submited
    </button>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from '@/stores/quizStore'
import { notify } from '@/lib/notify'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const quizStore = useQuizStore()
const router = useRouter()
const isDone = ref(false)

const backToQuizForm = () => {
  quizStore.isComplete = false
}

const sumbitQuizHandler = () => {
  quizStore.submitFinalAnswer().then(() => {
    if (quizStore.error) {
      notify(quizStore.error, 'error')
    } else {
      notify(quizStore.message, 'success')
      isDone.value = true
      setTimeout(() => {
        router.push('/dashboard')
        quizStore.typeQuiz = 0
        quizStore.isComplete = false
        quizStore.resetQuiz()
      }, 1500)
    }
  })
}
</script>

<style scoped></style>
