<template>
  <div class="min-h-screen w-full flex overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="[
        'h-screen fixed flex-col w-[280px] px-4 border-r border-r-slate-200 transition-transform duration-500 z-50 bg-white',
        isOpenSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <nav>
        <span class="flex justify-start items-center gap-2">
          <!-- <div class="h-8 w-8 rounded-md bg-slate-400"></div> -->
          <h1
            class="font-bold text-2xl my-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
          >
            IPRO Student
          </h1>
        </span>
        <div class="w-full flex flex-col gap-2">
          <router-link
            :class="sidebarLinkClass"
            :exact-active-class="activeLinkClass"
            to="/viewer/dashboard"
            >Murid</router-link
          >

          <router-link
            :class="sidebarLinkClass"
            :exact-active-class="activeLinkClass"
            to="/dashboard/school"
            >Sekolah</router-link
          >

          <router-link
            :class="sidebarLinkClass"
            :exact-active-class="activeLinkClass"
            to="/dashboard/scores"
            >Nilai</router-link
          >
        </div>
      </nav>
    </aside>

    <!-- Backdrop untuk mobile -->
    <div
      v-if="isOpenSidebar"
      @click="isOpenSidebar = false"
      class="fixed inset-0 bg-slate-500/50 bg-opacity-50 z-40 md:hidden"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 md:ml-[280px] flex flex-col h-screen overflow-hidden">
      <header
        class="dashboard-header py-2 px-4 flex justify-between items-center border-b border-b-slate-200 bg-white"
      >
        <div class="flex items-center gap-4">
          <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
        <span class="flex items-center gap-4">
          <p class="text-xs justify-center">{{ userStore.dataUser?.name }}</p>
          <button
            @click="handleLogout"
            class="text-white text-sm cursor-pointer bg-red-600 p-2 rounded-md hover:bg-red-500"
          >
            Sign out
          </button>
        </span>
      </header>
      <div class="flex-1 p-6 bg-[#F9FAFB] overflow-y-auto">
        <div class="max-w-full">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { LogoutErrorResponse } from '@/types/authTypes'
import { onMounted } from 'vue'
import { useUserStores } from '@/stores/userStores'

const userStore = useUserStores()
const authStore = useAuthStore()

onBeforeMount(() => {
  if (authStore.user?.role !== 'VIEWER') {
    router.push('/dashboard')
  }
})

onMounted(() => {
  userStore.initializeQuiz()
})

const router = useRouter()
const isOpenSidebar = ref(false)
const showLogoutErrorModal = ref(false)
const logoutErrorMessage = ref('')

const sidebarLinkClass =
  'w-full text-[#344054] font-base py-2 px-4 rounded-md transition duration-150 hover:bg-teal-50 hover:font-semibold cursor-pointer'

const activeLinkClass = 'text-teal-600 font-semibold py-2 px-4 bg-[#ECF3FF] hover:bg-[#ECF3FF]'

const toggleSidebar = () => {
  isOpenSidebar.value = !isOpenSidebar.value
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
