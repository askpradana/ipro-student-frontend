<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="store.isOpenModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" @click="store.closeModal"></div>

      <!-- Modal Content Container -->
      <div class="fixed z-50 transform px-4">
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="translate-y-4 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-4 opacity-0"
        >
          <div v-if="store.isOpenModal" class="overflow-hidden shadow-xl">
            <!-- Close button -->
            <button
              @click="store.closeModal"
              class="absolute right-10 top-6 text-slate-400 hover:text-slate-500"
            >
              <!-- <span class="sr-only">Close</span> -->
              <!-- <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg> -->
            </button>

            <slot></slot>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'

const store = useModalStore()
</script>
