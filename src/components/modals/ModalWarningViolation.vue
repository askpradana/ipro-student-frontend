<template>
  <div
    v-if="modalStore.isOpenModal && modalStore.typeModal === 'violation-warning'"
    class="bg-white rounded-xl shadow-lg p-4 max-w-md mx-2 transform transition-all duration-300 ease-in-out"
  >
    <div class="flex items-center mb-4">
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
      <h3 class="text-lg font-bold text-slate-800">Violation Alert</h3>
    </div>

    <p class="text-slate-700 mb-6">
      {{ getViolationWarning(modalStore.message) }}
    </p>

    <div class="text-gray-500 text-sm mb-6">
      <p>Pelanggaran yang terdeteksi dapat mempengaruhi nilai akhir Anda.</p>
      <p class="mt-2">Jumlah pelanggaran: {{ quizStore.violationCount }}</p>
    </div>

    <div class="text-right">
      <button
        @click="modalStore.closeModal()"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
      >
        Saya Mengerti
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { useQuizStore } from '@/stores/quizStore'
import { getViolationWarning } from '@/lib/getWarningViolation'

const modalStore = useModalStore()
const quizStore = useQuizStore()
</script>
