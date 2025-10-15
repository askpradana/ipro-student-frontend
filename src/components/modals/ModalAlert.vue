<template>
  <div class="py-6 px-8 min-w-[320px] rounded-xl bg-white border border-slate-200 shadow-md">
    <div class="flex justify-start items-center">
      <!-- Dynamic icon background based on alert type -->
      <div
        class="p-3 rounded-full mr-4 transition-colors duration-300"
        :class="iconBackgroundClass"
      >
        <!-- Success Icon -->
        <svg
          v-if="isSuccess"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-colors duration-300"
          :class="iconClass"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <!-- Error/Warning Icon -->
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 transition-colors duration-300"
          :class="iconClass"
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
        class="px-4 py-2 rounded-lg text-white transition-all duration-300 font-medium"
        :class="buttonClass"
      >
        Tutup
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'

const { message, titleModal, type = 'error' } = defineProps<{
  message: string
  titleModal: string
  type?: 'success' | 'error'
}>()

const modalStore = useModalStore()

// Computed property to determine if it's a success state
const isSuccess = computed(() => type === 'success')

// Icon background classes based on type
const iconBackgroundClass = computed(() => {
  if (isSuccess.value) {
    // For success: Use amber/orange tones that suggest success but maintain alertness
    // This conveys "operation completed successfully, but stay aware"
    return 'bg-amber-100 border-2 border-amber-200'
  }
  // For error: Keep the existing red styling
  return 'bg-red-100 border-2 border-red-200'
})

// Icon color classes
const iconClass = computed(() => {
  if (isSuccess.value) {
    // Use a deep amber/orange color for success that maintains visibility
    return 'text-amber-700'
  }
  // Keep red for errors
  return 'text-red-600'
})

// Button classes based on type
const buttonClass = computed(() => {
  if (isSuccess.value) {
    // Success button: Amber gradient that suggests completion but maintains admin attention
    // The amber/orange color family provides positive feedback while retaining alertness
    return 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-amber-500/25'
  }
  // Keep red for errors
  return 'bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 shadow-lg hover:shadow-red-500/25'
})

const quitHandler = () => {
  modalStore.closeModal()
}
</script>

<style scoped></style>
