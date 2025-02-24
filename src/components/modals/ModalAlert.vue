<template>
  <div class="py-6 px-8 min-w-[320px] rounded-xl bg-white border border-slate-200 shadow-md">
    <h2 class="text-xl font-bold text-slate-800">{{ titleModal }}</h2>
    <p class="my-4 text-slate-600">{{ message }}</p>
    <div class="mt-8 flex w-full justify-end gap-2">
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
