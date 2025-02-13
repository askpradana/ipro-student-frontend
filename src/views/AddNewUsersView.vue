<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
        >
          Add New Users
        </h1>
        <!-- <router-link
          to="/admin/dashboard"
          class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Back to Dashboard
        </router-link> -->
      </div>

      <!-- Common fields -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-lg font-semibold mb-4">Common Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
            <input
              v-model="newUsersData.school"
              type="text"
              placeholder="Enter school name"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test Period</label>
            <input
              v-model="newUsersData.testPeriod"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              :min="new Date().toISOString().split('.')[0]"
            />
          </div>
        </div>
      </div>

      <!-- User entries -->
      <div class="space-y-4 mb-6">
        <div
          v-for="(user, index) in newUsersData.users"
          :key="index"
          class="bg-white rounded-xl shadow-lg p-6"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold">User {{ index + 1 }}</h3>
            <button
              @click="removeUser(index)"
              class="text-red-600 hover:text-red-700"
              :disabled="newUsersData.users.length === 1"
            >
              Remove User
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="user.name"
                type="text"
                placeholder="Enter full name"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="user.email"
                type="email"
                placeholder="Enter email address"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              <select
                v-model="user.grade"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select grade</option>
                <option v-for="grade in GRADES" :key="grade" :value="grade">
                  Grade {{ grade }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Add user button -->
      <button
        @click="addNewUser"
        class="w-full py-3 mb-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-teal-500 hover:text-teal-500"
      >
        + Add Another User
      </button>

      <!-- Action buttons -->
      <div class="flex justify-end space-x-4">
        <router-link
          to="/admin/dashboard"
          class="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </router-link>
        <button
          @click="saveNewUsers"
          class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isValidNewUsers"
        >
          Save All Users
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const router = useRouter()
const adminStore = useAdminStore()

const GRADES = ['9', '10', '11', '12'] as const

const newUsersData = ref({
  school: '',
  testPeriod: '',
  users: [{ name: '', email: '', grade: '' }],
})

const isValidNewUsers = computed(() => {
  return (
    newUsersData.value.school &&
    newUsersData.value.testPeriod &&
    newUsersData.value.users.length > 0 &&
    newUsersData.value.users.every((user) => user.name && user.email && user.grade)
  )
})

const addNewUser = () => {
  newUsersData.value.users.push({ name: '', email: '', grade: '' })
}

const removeUser = (index: number) => {
  if (newUsersData.value.users.length > 1) {
    newUsersData.value.users.splice(index, 1)
  }
}

const saveNewUsers = async () => {
  try {
    const users = newUsersData.value.users.map((user) => ({
      ...user,
      school: newUsersData.value.school,
      testPeriod: new Date(newUsersData.value.testPeriod),
    }))

    await adminStore.addMultipleUsers(users)
    router.push('/admin/dashboard')
  } catch (error) {
    console.error('Error adding users:', error)
    alert('Failed to add users. Please try again.')
  }
}
</script>
