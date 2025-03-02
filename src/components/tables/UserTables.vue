<template>
  <div class="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.grade }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.school }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <span
              :class="{
                'text-green-600':
                  getQuizCompletionStatus(user.quizStatus) === 'All quizzes completed',
                'text-yellow-600': getQuizCompletionStatus(user.quizStatus).startsWith(
                  'Completed:',
                ),
                'text-gray-600': getQuizCompletionStatus(user.quizStatus) === 'Not started yet',
              }"
            >
              {{ getQuizCompletionStatus(user.quizStatus) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatDate(user.testPeriod) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatDate(user.lastLogin) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.attemptLogin }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ formatDate(user.createdAt) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ user.createdBy }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <div class="flex items-center space-x-2">
              <button
                @click="$emit('calculate', user.id)"
                class="bg-teal-100 text-teal-600 px-3 py-1 rounded hover:bg-teal-200"
              >
                Calculate
              </button>
              <button
                @click="$emit('edit', user)"
                class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                @click="$emit('resetAttempts', user.id)"
                class="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
              >
                Reset Login
              </button>
              <button
                @click="$emit('resetPassword', user.id)"
                class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
              >
                Reset Password
              </button>
              <button
                @click="$emit('delete', user.id)"
                class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { type User } from '@/stores/admin'
import { useQuizStore } from '@/stores/quizStore'

defineProps<{
  users: User[]
  tableHeaders: readonly string[]
}>()

defineEmits<{
  (e: 'edit', user: User): void
  (e: 'resetAttempts', userId: string): void
  (e: 'resetPassword', userId: string): void
  (e: 'delete', userId: string): void
  (e: 'calculate', userId: string): void
}>()

const quizStore = useQuizStore()
const getQuizCompletionStatus = quizStore.getQuizCompletionStatus

const formatDate = (date: Date | null): string => {
  if (!date) return '-'
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(date))
  } catch (error) {
    console.error('Date formatting error:', error)
    return '-'
  }
}
</script>
