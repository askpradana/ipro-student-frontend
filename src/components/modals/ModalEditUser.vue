<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl p-6 max-w-lg w-full">
      <h2 class="text-xl font-bold mb-4">Edit User</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            v-model="localUser.name"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="localUser.email"
            type="email"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
          <select
            v-model="localUser.grade"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option v-for="grade in grades" :key="grade" :value="grade">Grade {{ grade }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
          <select
            v-model="localUser.school"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option v-for="school in schools" :key="school" :value="school">
              {{ school }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Test Completion</label>
          <input
            v-model="localUser.testCompletedAt"
            type="datetime-local"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Test Period</label>
          <input
            v-model="localUser.testPeriod"
            type="datetime-local"
            :class="[
              'w-full rounded-lg border px-4 py-2 focus:ring-1 focus:ring-teal-500',
              isValidDate ? 'border-gray-300 focus:border-teal-500' : 'border-red-500',
            ]"
            :min="new Date().toISOString().split('.')[0]"
            @input="validateDate"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end space-x-3">
        <button
          @click="$emit('close')"
          class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          @click="$emit('save', localUser)"
          class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type EditingUser } from '@/stores/admin'

const props = defineProps<{
  show: boolean
  user: EditingUser
  grades: readonly string[]
  schools: readonly string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', user: EditingUser): void
}>()

const localUser = ref<EditingUser>({ ...props.user })
const isValidDate = ref(true)

watch(
  () => props.user,
  (newValue) => {
    localUser.value = { ...newValue }
  },
  { deep: true },
)

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      localUser.value = { ...props.user }
    }
  },
)

const validateDate = () => {
  const selectedDate = new Date(localUser.value.testPeriod)
  isValidDate.value = selectedDate > new Date()
}
</script>
