<template>
  <div class="py-6 px-8 min-w-[320px] rounded-xl bg-white border border-slate-200 shadow-md">
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
      <h2 class="text-xl font-bold text-slate-800">{{ titleModal }}</h2>
    </div>
    <p class="my-4 text-slate-600">{{ message }}</p>
    <div class="mt-8 flex w-full justify-end gap-2">
      <button
        @click="quitHandler"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 transition-all duration-300"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const { message, titleModal } = defineProps<{
  message: string
  titleModal: string
}>()
const modalStore = useModalStore()

const quitHandler = () => {
  modalStore.closeModal()
}
</script>

<style scoped></style>
