<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
        >
          Viewer Dashboard
        </h1>
        <button
          @click="handleLogout"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <!-- Loading and error states -->
      <LoadingSpinner v-if="isLoading" />

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
        <button @click="fetchData" class="ml-2 underline hover:text-red-700">Try again</button>
      </div>

      <!-- Main content when not loading and no error -->
      <template v-else>
        <!-- Search Bar -->
        <SearchBar v-model:searchQuery="searchQuery" v-model:searchField="searchField" />

        <!-- Add Users Button -->
        <!-- <div class="mb-6 flex justify-end">
          <router-link
            to="/admin/add-users"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
          >
            Add Users
          </router-link>
        </div> -->

        <!-- Pagination Controls -->
        <PaginationControls
          v-model:itemsPerPage="itemsPerPage"
          :pageSizes="pageSizes"
          :startIndex="startIndex"
          :endIndex="endIndex"
          :totalItems="filteredUsers.length"
        />

        <!-- User Table -->
        <UserTable
          :users="paginatedUsers"
          :tableHeaders="tableHeaders"
          @edit="openEditModal"
          @reset-password="handleResetPassword"
          @delete="handleDeleteUser"
          @calculate="HandleCalculateUser"
        />

        <!-- Pagination -->
        <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" />
      </template>
    </div>

    <!-- Edit User Modal -->
    <EditUserModal
      :show="showEditModal"
      :user="editingUser"
      :grades="GRADES"
      @close="closeEditModal"
      @save="handleSaveChanges"
    />

    <!-- Logout Error Modal -->
    <LogoutErrorModal
      :show="showLogoutErrorModal"
      :message="logoutErrorMessage"
      @force-logout="forceLogout"
    />

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

// Import Components
import LoadingSpinner from '@/components/skeletons/LoadingSpinner.vue'
import SearchBar from '@/components/forms/SearchForm.vue'
import PaginationControls from '@/components/paginations/PaginationControl.vue'
import UserTable from '@/components/tables/UserTables.vue'
import Pagination from '@/components/paginations/PaginationTableUser.vue'
import EditUserModal from '@/components/modals/ModalEditUser.vue'
import LogoutErrorModal from '@/components/modals/ModalLogoutError.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const router = useRouter()
const showEditModal = ref(false)
const searchQuery = ref('')
const searchField = ref('name')
const modalStore = useModalStore()

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

const currentPage = ref(1)
const itemsPerPage = ref(10)
const pageSizes = [5, 10, 20, 50, 100]

const isLoading = ref(true)
const error = ref<string | null>(null)
const showLogoutErrorModal = ref(false)
const logoutErrorMessage = ref('')

const showResetPasswordModal = ref(false)
const resetPasswordEmail = ref('')

const openEditModal = (user: User): void => {
  editingUser.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    grade: user.grade,
    school: user.school,
    // testCompletedAt: user.testCompletedAt ? formatDate(user.testCompletedAt) : null,
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
    // testCompletedAt: null,
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

const handleSaveChanges = async (updatedUser: EditingUser) => {
  try {
    // Convert string dates to Date objects
    const formattedUser: User = {
      ...updatedUser,
      testPeriod: updatedUser.testPeriod ? new Date(updatedUser.testPeriod) : null,
      lastLogin: updatedUser.lastLogin ? new Date(updatedUser.lastLogin) : null,
      createdAt: new Date(updatedUser.createdAt),
      testCompletedAt: updatedUser.testCompletedAt ? new Date(updatedUser.testCompletedAt) : null,
    }
    await adminStore.updateUser(formattedUser)
    showEditModal.value = false
    fetchData()
  } catch (error) {
    console.error('Error saving changes:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Failed to save changes. Please try again.'
    modalStore.openModal()
  }
}

const handleDeleteUser = async (userId: string) => {
  try {
    await adminStore.deleteUser(userId)
    fetchData()
  } catch (error) {
    console.error('Error deleting user:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Failed to delete user. Please try again.'
    modalStore.openModal()
  }
}

const handleResetPassword = async (userId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/reset-password/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.getToken}`,
      },
    })

    if (response.ok) {
      modalStore.typeOfModal('success')
      modalStore.message = 'Password has been reset successfully'
      modalStore.openModal()
    } else {
      modalStore.typeOfModal('error')
      modalStore.message = 'Failed to reset password'
      modalStore.openModal()
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Failed to reset password. Please try again.'
    modalStore.openModal()
  }
}

// Computed properties for filtering and pagination
const filteredUsers = computed(() => {
  if (!searchQuery.value) return adminStore.users
  return adminStore.users.filter((user) => {
    const field = searchField.value as keyof typeof user
    const searchValue = user[field]?.toString().toLowerCase() || ''
    return searchValue.includes(searchQuery.value.toLowerCase())
  })
})

const HandleCalculateUser = (userId: string) => {
  router.push(`/user/calculate/${userId}`)
}

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)
const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value)
})

// Watch for changes that should reset pagination
watch([itemsPerPage, searchQuery], () => {
  currentPage.value = 1
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error: any) {
    console.error('Logout failed:', error)
    logoutErrorMessage.value =
      error.response?.data?.message || 'Failed to logout. Please try again.'
    showLogoutErrorModal.value = true
  }
}

const forceLogout = () => {
  showLogoutErrorModal.value = false
  authStore.$reset()
  router.push('/login')
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

// Helper function for formatting dates
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

onMounted(() => {
  fetchData()
})
</script>
