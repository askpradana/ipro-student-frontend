<template>
  <UserDashboardSkeleton v-if="userStore.loading" />
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Logo area -->
    <div class="mb-12 animate-fade-in">
      <h1
        class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        iPro student
      </h1>
    </div>

    <!-- Main content area -->
    <h1 class="my-10 font-semibold md:font-bold text-2xl md:text-3xl text-center text-teal-600">
      Selamat Datang {{ userStore.dataUser?.name }}
    </h1>
    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
      <!-- Quiz Button -->
      <button
        v-for="type in TypeListData"
        :key="type.id"
        @click="handleTakeQuiz(type.typeQuiz)"
        class="w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 hover:bg-white hover:scale-[1.02] hover:border-teal-500 active:scale-[0.98] transition-all duration-300 ease-out text-left group"
      >
        <h2
          class="text-xl font-bold text-teal-600 mb-2 group-hover:translate-x-1 transition-transform duration-300"
        >
          Take {{ type.title }}
        </h2>
        <p class="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          Start a new assessment to test your knowledge
        </p>
      </button>

      <!-- Results Button -->
      <!-- <button
        @click="handleSeeResults"
        class="w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 hover:bg-white hover:scale-[1.02] hover:border-emerald-100 active:scale-[0.98] transition-all duration-300 ease-out text-left group"
      >
        <h2
          class="text-xl font-bold text-emerald-600 mb-2 group-hover:translate-x-1 transition-transform duration-300"
        >
          See Results
        </h2>
        <p class="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          View your past quiz results and progress
        </p>
      </button> -->
    </div>

    <!-- Utility buttons -->
    <div class="fixed bottom-8 left-8 space-y-4">
      <HelpUserButton :handle-help="handleHelp" />
      <LogoutUserButton :handle-logout="handleLogout" />
    </div>

    <!-- Add modal dialog before closing template div -->
    <div
      v-if="showLogoutErrorModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 class="text-xl font-bold text-slate-800 mb-3">Session Expired</h2>
        <p class="text-slate-600 mb-6">{{ logoutErrorMessage }}</p>
        <div class="flex justify-end">
          <button
            @click="handleModalConfirm"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import TypeListData from '@/data/type-quiz.json'
import LogoutUserButton from '@/components/buttons/LogoutUserButton.vue'
import HelpUserButton from '@/components/buttons/helpUserButton.vue'
import { notify } from '@/lib/notify'
import { useUserStores } from '@/stores/userStores'
import UserDashboardSkeleton from '@/components/skeletons/UserDashboardSkeleton.vue'

const userStore = useUserStores()
const router = useRouter()
const authStore = useAuthStore()

const showLogoutErrorModal = ref(false)
const logoutErrorMessage = ref('')

onMounted(() => {
  userStore.initializeQuiz()
})

const handleTakeQuiz = (selectedTypeQuiz: number) => {
  // Will be implemented later
  // console.log('Navigate to quiz')
  localStorage.setItem('type-quiz', JSON.stringify(selectedTypeQuiz))
  router.push('/quiz')
}

const handleSeeResults = () => {
  router.push('/results')
}

const handleHelp = () => {
  notify('really', 'success')
  console.log('Show help')
}

const handleModalConfirm = () => {
  showLogoutErrorModal.value = false
  authStore.$reset()
  router.push('/login')
}

interface LogoutErrorResponse {
  message: string
  code: number
  status: string
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/')
  } catch (error: any) {
    console.error('Logout error:', error.response?.data)
    const errorData: LogoutErrorResponse = error.response?.data

    if (errorData?.code === 401 && errorData?.message === 'token not found or invalidated') {
      logoutErrorMessage.value = 'Your session has expired. Please log in again.'
      showLogoutErrorModal.value = true
      return
    }

    logoutErrorMessage.value = errorData?.message || 'Failed to logout. Please try again.'
    showLogoutErrorModal.value = true
  }
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
