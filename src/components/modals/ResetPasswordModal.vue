<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-bold mb-4">Reset Password</h2>
      <div class="mb-4">
        <p class="text-gray-600 mb-2">Reset password untuk:</p>
        <p class="font-medium">{{ email }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="newPassword"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Masukan password baru"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabindex="-1"
          >
            <svg
              v-if="showPassword"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.818 6.818M9.878 9.878a3 3 0 014.242 4.242m6.96 3.96L21 21M3 3l2.818 2.818m0 0A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
        <div class="relative">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Konfirmasi password baru"
            :class="{ 'border-red-500': confirmPassword && !passwordsMatch }"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabindex="-1"
          >
            <svg
              v-if="showConfirmPassword"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.818 6.818M9.878 9.878a3 3 0 014.242 4.242m6.96 3.96L21 21M3 3l2.818 2.818m0 0A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
        <p v-if="confirmPassword && !passwordsMatch" class="text-red-500 text-sm mt-1">
          Password tidak cocok
        </p>
      </div>
      <div class="flex justify-end space-x-3">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          Batal
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!newPassword || !confirmPassword || !passwordsMatch"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  show: boolean
  email: string
}>()

const emit = defineEmits<{
  close: []
  submit: [newPassword: string]
}>()

const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordsMatch = computed(() => {
  return newPassword.value === confirmPassword.value
})

const handleSubmit = () => {
  if (passwordsMatch.value) {
    emit('submit', newPassword.value)
    newPassword.value = ''
    confirmPassword.value = ''
  }
}
</script>
