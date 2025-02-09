<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <h1
        class="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        Admin Dashboard
      </h1>

      <!-- Add search controls -->
      <div class="mb-6 flex space-x-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        />
        <select
          v-model="searchField"
          class="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="school">School</option>
          <option value="createdBy">Created By</option>
        </select>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Grade {{ user.grade }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.school }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm',
                    user.isTestEnabled ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600',
                  ]"
                >
                  {{ user.isTestEnabled ? 'Enabled' : 'Disabled' }}
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
                    @click="openEditModal(user)"
                    class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    @click="adminStore.resetAttempts(user.id)"
                    class="bg-gray-100 text-gray-600 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Reset Login
                  </button>
                  <button
                    @click="handleResetPassword(user.id)"
                    class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
                  >
                    Reset Password
                  </button>
                  <button
                    @click="handleDeleteUser(user.id)"
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
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="editingUser.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="editingUser.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <select
              v-model="editingUser.grade"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="grade in GRADES" :key="grade" :value="grade">Grade {{ grade }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
            <select
              v-model="editingUser.school"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="school in SCHOOLS" :key="school" :value="school">
                {{ school }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test Status</label>
            <select
              v-model="editingUser.isTestEnabled"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option :value="true">Enabled</option>
              <option :value="false">Disabled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test Period</label>
            <input
              v-model="editingUser.testPeriod"
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
            @click="closeEditModal"
            class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminStore, type EditingUser, type User } from '@/stores/admin'

const adminStore = useAdminStore()
const showEditModal = ref(false)
const isValidDate = ref(true)
const searchQuery = ref('')
const searchField = ref('name')

const editingUser = ref<EditingUser>({
  id: '',
  name: '',
  email: '',
  grade: '',
  school: '',
  isTestEnabled: false,
  testPeriod: '',
  lastLogin: null,
  attemptLogin: 0,
  createdAt: '',
  createdBy: '',
})

const tableHeaders = [
  'Name',
  'Email',
  'Grade',
  'School',
  'Test Status',
  'Test Period',
  'Last Login',
  'Login Attempts',
  'Created At',
  'Created By',
  'Actions',
] as const

const GRADES = ['9', '10', '11', '12'] as const
const SCHOOLS = ['Springfield High School', 'Riverside Academy', 'Central Valley School'] as const

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

const validateDate = () => {
  const selectedDate = new Date(editingUser.value.testPeriod)
  isValidDate.value = selectedDate > new Date()
}

const openEditModal = (user: User): void => {
  editingUser.value = {
    ...user,
    testPeriod: formatDate(user.testPeriod),
    lastLogin: formatDate(user.lastLogin),
    createdAt: formatDate(user.createdAt),
  }
  showEditModal.value = true
}

const closeEditModal = (): void => {
  showEditModal.value = false
  editingUser.value = {
    id: '',
    name: '',
    email: '',
    grade: '',
    school: '',
    isTestEnabled: false,
    testPeriod: '',
    lastLogin: null,
    attemptLogin: 0,
    createdAt: '',
    createdBy: '',
  }
}

const saveChanges = async (): Promise<void> => {
  try {
    const updatedUser: User = {
      ...editingUser.value,
      testPeriod: editingUser.value.testPeriod ? new Date(editingUser.value.testPeriod) : null,
      lastLogin: editingUser.value.lastLogin ? new Date(editingUser.value.lastLogin) : null,
      createdAt: new Date(editingUser.value.createdAt),
    }
    await adminStore.updateUser(updatedUser)
    closeEditModal()
  } catch (error) {
    console.error('Error saving changes:', error)
    alert('Failed to save changes. Please try again.')
  }
}

const handleDeleteUser = async (userId: string): Promise<void> => {
  try {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await adminStore.deleteUser(userId)
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('Failed to delete user. Please try again.')
  }
}

const handleResetPassword = async (userId: string): Promise<void> => {
  try {
    if (confirm("Are you sure you want to reset this user's password?")) {
      const success = await adminStore.resetPassword(userId)
      if (success) {
        alert('Password has been reset successfully')
      } else {
        alert('Failed to reset password')
      }
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Failed to reset password. Please try again.')
  }
}

// Add computed property for filtered users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return adminStore.users
  return adminStore.users.filter((user) => {
    const field = searchField.value as keyof typeof user
    const searchValue = user[field]?.toString().toLowerCase() || ''
    return searchValue.includes(searchQuery.value.toLowerCase())
  })
})
</script>
