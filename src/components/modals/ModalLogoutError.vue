<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl p-6 max-w-lg w-full">
      <h2 class="text-xl font-bold mb-4">Logout Error</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      <div class="flex justify-end space-x-3">
        <button
          @click="$emit('forceLogout')"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Proceed to Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
}>()

defineEmits<{
  (e: 'forceLogout'): void
}>()
</script>
