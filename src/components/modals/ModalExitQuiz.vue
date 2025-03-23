<template>
  <div class="py-6 px-8 rounded-xl bg-white border border-slate-200 shadow-md">
    <div class="flex justify-start items-center">
      <div class="bg-red-100 p-3 rounded-full mr-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-slate-800 tracking-tight">Meninggalkan Kuis</h2>
    </div>
    <p class="my-4 text-slate-600">Kamu yakin ingin meninggalkan sesi kuis saat ini?</p>
    <div class="mt-8 flex w-full justify-end gap-2">
      <button
        @click="modalStore.closeModal"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-slate-400 to-slate-400 hover:from-slate-500 hover:to-slate-600 transition-all duration-300"
      >
        Batal
      </button>
      <button
        @click="quitHandler"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transition-all duration-300"
      >
        Keluar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { useQuizStore } from '@/stores/quizStore'
import { useTimerStore } from '@/stores/timerStore'
import { useRouter } from 'vue-router'

const modalStore = useModalStore()
const quizStore = useQuizStore()
const timerStore = useTimerStore()
const router = useRouter()

const quitHandler = () => {
  router.push('/dashboard')
  quizStore.resetQuiz()
  timerStore.stopTimer()
  modalStore.closeModal()
}
</script>

<style scoped></style>
