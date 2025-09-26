<template>
  <div class="mb-4 flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <label class="text-sm text-gray-600">Show</label>
      <select
        v-model="localItemsPerPage"
        class="rounded-lg border border-gray-300 px-3 py-1 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        @change="$emit('update:itemsPerPage', localItemsPerPage)"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
      <span class="text-sm text-gray-600">entries</span>
    </div>
    <div class="text-sm text-gray-600">
      Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalItems) }} of
      {{ totalItems }} entries
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  itemsPerPage: number
  pageSizes: number[]
  startIndex: number
  endIndex: number
  totalItems: number
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'update:itemsPerPage', value: number): void
}>()

const localItemsPerPage = ref(props.itemsPerPage)

watch(
  () => props.itemsPerPage,
  (newValue) => {
    localItemsPerPage.value = newValue
  },
)
</script>
