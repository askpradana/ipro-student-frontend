<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </h1>
        <button
          @click="handleLogout"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Keluar
        </button>
      </div>

      <!-- Add loading and error states -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
        <button @click="fetchData" class="ml-2 underline hover:text-red-700">Try again</button>
      </div>

      <!-- Only show the rest of the content when not loading and no error -->
      <template v-else>
        <!-- Add search controls -->
        <div class="mb-6 flex space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pencarian..."
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          <select
            v-model="searchField"
            class="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="name">Nama</option>
            <option value="email">Email</option>
            <option value="school">Sekolah</option>
            <option value="createdBy">Dibuat oleh</option>
          </select>
        </div>

        <!-- Add this button after the search controls and before the table -->
        <div class="mb-6 flex justify-end gap-2">
          <router-link
            to="/admin/add-users"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Tambahkan Sekolah
          </router-link>
          <router-link
            to="/admin/add-students"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Tambah Murid
          </router-link>
        </div>

        <!-- Add after search controls, before the table -->
        <div class="mb-4 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600">Show</label>
            <select
              v-model="itemsPerPage"
              class="rounded-lg border border-gray-300 px-3 py-1 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
            <span class="text-sm text-gray-600">entries</span>
          </div>
          <div class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredUsers.length) }} of
            {{ filteredUsers.length }} entries
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header"
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.grade }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.school }}</td>
                <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ user.testCompletedAt ? formatDate(user.testCompletedAt) : 'Not taken yet' }}
                </td> -->
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
                      @click="handleResetPassword(user.id)"
                      class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
                    >
                      Reset Password
                    </button>
                    <button
                      @click="handleDeleteUser(user.id)"
                      class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add after the table -->
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</div>
          <div class="flex space-x-2">
            <button
              @click="currentPage = 1"
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
              @click="currentPage--"
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
              @click="currentPage++"
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
              @click="currentPage = totalPages"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
            <select
              v-model="editingUser.grade"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="grade in GRADES" :key="grade" :value="grade">Grade {{ grade }}</option>
            </select>
          </div>
          <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">School</label>
            <select
              v-model="editingUser.school"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="school in SCHOOLS" :key="school" :value="school">
                {{ school }}
              </option>
            </select>
          </div> -->
          <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test Completion</label>
            <input
              v-model="editingUser.testCompletedAt"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div> -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Periode Tes</label>
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
            Batal
          </button>
          <button
            @click="saveChanges(editingUser)"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Add this modal dialog near the end of the template, before closing </div> -->
    <div
      v-if="showLogoutErrorModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Logout Error</h2>
        <p class="text-gray-600 mb-6">{{ logoutErrorMessage }}</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="forceLogout"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Proceed to Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div
      v-if="showResetPasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-bold mb-4">Reset Password</h2>
        <div class="mb-4">
          <p class="text-gray-600 mb-2">Reset password untuk:</p>
          <p class="font-medium">{{ resetPasswordEmail }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
          <input
            type="password"
            v-model="newPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Masukan password baru"
          />
        </div>
        <div class="flex justify-end space-x-3">
          <button @click="closeResetPasswordModal" class="px-4 py-2 text-gray-600 hover:text-gray-800">
            Batal
          </button>
          <button
            @click="submitResetPassword"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            :disabled="!newPassword"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>

    <!-- Add Modal Components -->
    <ModalContainer>
      <ModalAlert
        v-if="modalStore.typeModal === 'success' || modalStore.typeModal === 'error'"
        :title-modal="modalStore.typeModal === 'success' ? 'Success' : 'Error'"
        :message="modalStore.message"
      />
    </ModalContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useAdminStore, type EditingUser, type User } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import ModalAlert from '@/components/modals/ModalAlert.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const router = useRouter()
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
  testPeriod: '',
  lastLogin: null,
  attemptLogin: 0,
  createdAt: '',
  createdBy: '',
  quizStatus: {
    tiga: false,
    lima: false,
    enam: false,
    tujuh: false,
    ppi: false,
  },
})

const tableHeaders = [
  'Nama',
  'Email',
  'Kelas',
  'Sekolah',
  // 'Test Completion',
  'Tes Periode',
  'Terakhir Login',
  'Percobaan Login',
  'Dibuat Pada',
  'Dibuat Oleh',
  'Aksi',
] as const

const GRADES = ['9', '10', '11', '12'] as const
// const SCHOOLS = ['Springfield High School', 'Riverside Academy', 'Central Valley School'] as const

const currentPage = ref(1)
const itemsPerPage = ref(10)
const pageSizes = [5, 10, 20, 50, 100]

const isLoading = ref(true)
const error = ref<string | null>(null)

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
    id: user.id,
    name: user.name,
    email: user.email,
    grade: user.grade,
    school: user.school,
    testPeriod: formatDate(user.testPeriod),
    lastLogin: formatDate(user.lastLogin),
    attemptLogin: user.attemptLogin,
    createdAt: formatDate(user.createdAt),
    createdBy: user.createdBy,
    quizStatus: user.quizStatus,
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
    testPeriod: '',
    lastLogin: null,
    attemptLogin: 0,
    createdAt: '',
    createdBy: '',
    quizStatus: {
      tiga: false,
      lima: false,
      enam: false,
      tujuh: false,
      ppi: false,
    },
  }
}

const modalStore = useModalStore()

const saveChanges = async (updatedUser: EditingUser) => {
  try {
    await adminStore.updateUserApi({
      ...updatedUser,
      testPeriod: updatedUser.testPeriod || '',
      lastLogin: updatedUser.lastLogin || null,
      createdAt: updatedUser.createdAt || '',
    })
    showEditModal.value = false
    fetchData()
  } catch (error: unknown) {
    console.error('Error menyimpan perubahan:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal menyimpan perubahan. Silahkan coba lagi.'
    modalStore.openModal()
  }
}

const handleDeleteUser = async (userId: string) => {
  try {
    await adminStore.deleteUser(userId)
    fetchData()
  } catch (error: unknown) {
    console.error('Error menghapus user:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal menghapus data. Silahkan coba lagi.'
    modalStore.openModal()
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

// Add these computed properties
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)

// Modify the existing filteredUsers computed to include pagination
const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value)
})

// Watch for changes that should reset pagination
watch([itemsPerPage, searchQuery], () => {
  currentPage.value = 1
})

// Add these refs
const showLogoutErrorModal = ref(false)
const logoutErrorMessage = ref('')

const showResetPasswordModal = ref(false)
const resetPasswordEmail = ref('')
const newPassword = ref('')

// Replace the existing handleLogout function
const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error: any) {
    console.error('Logout failed:', error)
    // Show the error modal with the message from the API
    logoutErrorMessage.value =
      error.response?.data?.message || 'Failed to logout. Please try again.'
    showLogoutErrorModal.value = true
  }
}

// Add this new function to handle forced logout
const forceLogout = () => {
  showLogoutErrorModal.value = false
  // Clear any necessary auth state
  authStore.$reset()
  // Redirect to login page
  router.push('/login')
}

const handleResetPassword = async (userId: string) => {
  const user = adminStore.users.find((u) => u.id === userId)
  if (user) {
    resetPasswordEmail.value = user.email
    showResetPasswordModal.value = true
  }
}

const closeResetPasswordModal = () => {
  showResetPasswordModal.value = false
  resetPasswordEmail.value = ''
  newPassword.value = ''
}

const submitResetPassword = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/reset-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.getToken}`,
      },
      body: JSON.stringify({
        email: resetPasswordEmail.value,
        new_password: newPassword.value,
      }),
    })

    if (response.ok) {
      modalStore.typeOfModal('success')
      modalStore.message = 'Password berhasil direset!'
      modalStore.openModal()
      closeResetPasswordModal()
    } else {
      modalStore.typeOfModal('error')
      modalStore.message = 'Gagal mereset password'
      modalStore.openModal()
    }
  } catch (error) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal mereset password'
    modalStore.openModal()
    console.log(error)
  }
}

const fetchData = async () => {
  try {
    isLoading.value = true
    error.value = null
    await adminStore.fetchUsers()
  } catch (err) {
    error.value = 'Failed to load users. Please try again.'
    console.error('Error fetching users:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>
