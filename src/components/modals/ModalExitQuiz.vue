<template>
  <div class="py-6 px-8 rounded-xl bg-white border border-slate-200 shadow-md">
    <h2 class="text-xl font-bold text-slate-800">Quit</h2>
    <p class="my-4 text-slate-600">Are you sure want to leave from this quiz section?</p>
    <div class="mt-8 flex w-full justify-end gap-2">
      <button
        @click="modalStore.closeModal"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-slate-400 to-slate-400 hover:from-slate-500 hover:to-slate-600 transition-all duration-300"
      >
        Cancel
      </button>
      <button
        @click="quitHandler"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transition-all duration-300"
      >
        Quit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { useQuizStore } from '@/stores/quizStore'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()
const quizStore = useQuizStore()
const router = useRouter()

const quitHandler = () => {
  localStorage.removeItem('type-quiz')
  router.push('/dashboard')
  quizStore.resetQuiz()
  modalStore.closeModal()
}
</script>

<style scoped></style>
