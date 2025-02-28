<template>
  <div class="mt-4 flex justify-between items-center">
    <div class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</div>
    <div class="flex space-x-2">
      <button
        @click="$emit('update:currentPage', 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border"
        :class="
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50'
        "
      >
        First
      </button>
      <button
        @click="$emit('update:currentPage', currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-1 rounded border"
        :class="
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50'
        "
      >
        Previous
      </button>
      <button
        @click="$emit('update:currentPage', currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border"
        :class="
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50'
        "
      >
        Next
      </button>
      <button
        @click="$emit('update:currentPage', totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded border"
        :class="
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white hover:bg-gray-50'
        "
      >
        Last
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()
</script>
