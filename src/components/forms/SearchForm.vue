<template>
  <div class="mb-6 flex space-x-4">
    <input
      v-model="localSearchQuery"
      type="text"
      placeholder="Pencarian..."
      class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      @input="updateSearch"
    />
    <select
      v-model="localSearchField"
      class="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
      @change="updateSearch"
    >
      <option value="name">Nama</option>
      <option value="email">Email</option>
      <option value="school">Sekolah</option>
      <option value="createdBy">Dibuat oleh</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  searchQuery: string
  searchField: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:searchField', value: string): void
}>()

const localSearchQuery = ref(props.searchQuery)
const localSearchField = ref(props.searchField)

watch(
  () => props.searchQuery,
  (newValue) => {
    localSearchQuery.value = newValue
  },
)

watch(
  () => props.searchField,
  (newValue) => {
    localSearchField.value = newValue
  },
)

const updateSearch = () => {
  emit('update:searchQuery', localSearchQuery.value)
  emit('update:searchField', localSearchField.value)
}
</script>
