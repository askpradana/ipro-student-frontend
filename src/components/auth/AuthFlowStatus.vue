<template>
  <div
    v-if="shouldShow"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl relative">
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': !canClose }"
        :disabled="!canClose"
        title="Close"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ currentMessage }}</h3>
        <p class="text-gray-600 text-sm">{{ currentDescription }}</p>

        <!-- Progress indicator -->
        <div class="mt-4">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <p class="text-xs text-gray-500 mt-1">Step {{ currentStep }} of {{ totalSteps }}</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="text-center">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Authentication Failed</h3>
        <p class="text-gray-600 text-sm mb-4">{{ authFlow.state.error }}</p>

        <div class="flex gap-3">
          <button
            @click="retryAuth"
            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <button
            @click="closeModal"
            class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Success State (brief) -->
      <div v-else-if="isSuccess" class="text-center">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Authentication Successful</h3>
        <p class="text-gray-600 text-sm mb-4">
          Redirecting in {{ countdown }} seconds...
        </p>

        <button
          @click="closeModal"
          class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onUnmounted, ref, onMounted } from 'vue'
import { useAuthFlow } from '@/composables/useAuthFlow'
import type { AuthFlowState } from '@/composables/useAuthFlow'

const authFlow = useAuthFlow()
const countdown = ref(3)

const shouldShow = computed(() => {
  return authFlow.state.isProcessing || authFlow.state.state === 'error' || authFlow.state.state === 'success'
})

const isLoading = computed(() => {
  return authFlow.state.isProcessing
})

const hasError = computed(() => {
  return authFlow.state.state === 'error'
})

const isSuccess = computed(() => {
  return authFlow.state.state === 'success'
})

const stateMessages: Record<AuthFlowState, { message: string; description: string; step: number }> = {
  idle: { message: '', description: '', step: 0 },
  processing_jwt: { message: 'Processing Authentication', description: 'Validating your credentials...', step: 1 },
  authenticating: { message: 'Authenticating', description: 'Verifying your access...', step: 2 },
  loading_profile: { message: 'Loading Profile', description: 'Fetching your account information...', step: 3 },
  checking_profile: { message: 'Checking Profile', description: 'Verifying profile completeness...', step: 4 },
  success: { message: 'Success', description: 'Authentication completed successfully', step: 5 },
  error: { message: 'Error', description: 'Authentication failed', step: 0 }
}

const totalSteps = 5

const currentMessage = computed(() => {
  return stateMessages[authFlow.state.state]?.message || 'Processing...'
})

const currentDescription = computed(() => {
  return stateMessages[authFlow.state.state]?.description || 'Please wait...'
})

const currentStep = computed(() => {
  return stateMessages[authFlow.state.state]?.step || 1
})

const progressPercentage = computed(() => {
  return Math.min((currentStep.value / totalSteps) * 100, 100)
})

const canClose = computed(() => {
  // Allow closing when not in critical authentication steps
  return authFlow.state.state !== 'authenticating' && authFlow.state.state !== 'processing_jwt'
})

const closeModal = () => {
  if (authFlow.state.state === 'success' && authFlow.state.redirectTo) {
    // If successful, navigate to the intended destination
    window.location.href = authFlow.state.redirectTo
  } else {
    // Otherwise just reset the state and close the modal
    authFlow.resetState()
  }
}

const retryAuth = () => {
  // Reset the auth flow and redirect to login
  authFlow.resetState()
  window.location.href = '/login'
}

// Auto-close after successful authentication
let autoCloseTimeout: number | null = null
let countdownInterval: number | null = null

watch(
  () => authFlow.state.state,
  (newState) => {
    if (newState === 'success') {
      // Reset countdown
      countdown.value = 3

      // Start countdown
      countdownInterval = window.setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
          if (countdownInterval) {
            clearInterval(countdownInterval)
            countdownInterval = null
          }
          closeModal()
        }
      }, 1000)
    } else {
      // Clear any existing intervals/timeouts if state changes
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout)
        autoCloseTimeout = null
      }
      if (countdownInterval) {
        clearInterval(countdownInterval)
        countdownInterval = null
      }
    }
  }
)

// Handle Escape key to close modal
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && canClose.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
  }
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>