<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-96">
      <h2 class="text-xl font-bold mb-4">Reset Password</h2>
      <div class="mb-4">
        <p class="text-gray-600 mb-2">Resetting password for:</p>
        <p class="font-medium">{{ email }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          v-model="newPassword"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter new password"
        />
      </div>
      <div class="flex justify-end space-x-3">
        <button @click="$emit('close')" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          :disabled="!newPassword"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  show: boolean
  email: string
}>()

const emit = defineEmits<{
  close: []
  submit: [newPassword: string]
}>()

const newPassword = ref('')

const handleSubmit = () => {
  emit('submit', newPassword.value)
  newPassword.value = ''
}
</script>
