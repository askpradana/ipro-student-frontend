<template>
  <UserDashboardSkeleton v-if="userStore.loading" />
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Logo area -->
    <div class="mb-12 animate-fade-in">
      <img
        src="/assets/iradat-konsultan.png"
        height="80"
        width="80"
        alt="company-profile"
        class="select-none"
      />
    </div>

    <!-- Main content area -->
    <h1
      class="my-14 font-semibold md:font-bold text-2xl md:text-3xl text-center text-teal-600 uppercase"
    >
      SELAMAT DATANG {{ userStore.dataUser?.name }}
    </h1>
    <div class="max-w-4xl mx-auto">
      <!-- No Access Message for users with 'none' privileges -->
      <div
        v-if="userStore.dataUser?.quiz_privileges === 'none' || filteredQuizzes.length === 0"
        class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center"
      >
        <div class="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-blue-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold text-blue-900 mb-2">Akses Quiz Belum Tersedia</h3>
        <p class="text-blue-700 mb-4">
          Anda belum memiliki akses untuk mengisi quiz. Silahkan hubungi admin untuk mendapatkan akses mengisi quiz.
        </p>
        <div class="text-sm text-blue-600">
          <p>Untuk bantuan lebih lanjut, silahkan menghubungi admin sistem.</p>
        </div>
      </div>

      <!-- Quiz Buttons Grid (only shown when user has privileges) -->
      <div
        v-else
        class="grid md:grid-cols-2 gap-4"
      >
        <!-- Quiz Button -->
        <button
          v-for="type in filteredQuizzes"
          :key="type.id"
          @click="handleTakeQuiz(type.typeQuiz)"
          class="w-full p-8 backdrop-blur-sm rounded-2xl border border-slate-200 transition-all duration-300 ease-out text-left group relative"
          :class="[
            userStore.dataUser?.[
              type.quiz as
                | 'quiz_tiga'
                | 'quiz_lima'
                | 'quiz_enam'
                | 'quiz_tujuh'
                | 'quiz_ppi'
                | 'quiz_riasec'
            ]
              ? 'bg-slate-100 hover:cursor-not-allowed'
              : type.disabled
                ? 'bg-slate-100/50 hover:cursor-not-allowed'
                : 'bg-white/80 hover:bg-white hover:scale-[1.02] hover:border-teal-500 active:scale-[0.98]',
          ]"
          v-bind:disabled="
            userStore.dataUser?.[
              type.quiz as
                | 'quiz_tiga'
                | 'quiz_lima'
                | 'quiz_enam'
                | 'quiz_tujuh'
                | 'quiz_ppi'
                | 'quiz_riasec'
            ] || type.disabled
          "
        >
          <div class="flex justify-between !items-center">
            <h2
              class="text-xl font-bold transition-transform duration-300"
              :class="[
                userStore.dataUser?.[
                  type.quiz as
                    | 'quiz_tiga'
                    | 'quiz_lima'
                    | 'quiz_enam'
                    | 'quiz_tujuh'
                    | 'quiz_ppi'
                    | 'quiz_riasec'
                ]
                  ? 'text-slate-600'
                  : type.disabled
                    ? 'text-slate-400'
                    : 'text-teal-600 group-hover:translate-x-1',
              ]"
            >
              {{ type.title }}
            </h2>
            <div class="flex items-center gap-2">
              <p
                v-if="type.disabled"
                class="-mt-1 text-xs py-1 px-2 border rounded-md bg-slate-100 border-slate-200 font-semibold text-slate-400"
              >
                Coming Soon
              </p>
              <p
                v-else-if="
                  userStore.dataUser?.[
                    type.quiz as
                      | 'quiz_tiga'
                      | 'quiz_lima'
                      | 'quiz_enam'
                      | 'quiz_tujuh'
                      | 'quiz_ppi'
                      | 'quiz_riasec'
                  ]
                "
                class="-mt-1 text-xs py-1 px-2 border rounded-md bg-slate-100 border-slate-200 font-semibold text-red-400"
              >
                Selesai
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div
      class="flex justify-center items-center flex-col mt-14"
      :class="
        userStore.quiz_tiga &&
        userStore.quiz_lima &&
        userStore.quiz_enam &&
        userStore.quiz_tujuh &&
        userStore.quiz_ppi &&
        userStore.quiz_riasec
          ? ''
          : 'hidden'
      "
    >
      <q class="text-center max-w-screen-md mx-auto">
        Terima kasih telah menyelesaikan semua tes! Kami sangat menghargai waktu dan usaha Anda.
        Mohon luangkan sedikit waktu untuk mengisi kuisioner di bawah ini untuk membantu kami
        meningkatkan pengalaman Anda.
      </q>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSfoXnrrN7jhoK0M_IgbYLputHDoNjBenkYDvrzaG3zuzffN3g/viewform"
        target="_blank"
        class="mt-4 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
        >Isi Feedback</a
      >
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

    <!-- Coming Soon Modal -->
    <div
      v-if="showComingSoonModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
        <h2 class="text-xl font-bold text-slate-800 mb-3">Coming Soon</h2>
        <p class="text-slate-600 mb-6">Tes RIASEC akan segera hadir. Mohon bersabar.</p>
        <div class="flex justify-end">
          <button
            @click="showComingSoonModal = false"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutConfirmModal"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" @click="cancelLogout"></div>

      <!-- Modal Content -->
      <div class="relative z-50 transform px-4">
        <LogoutConfirmModal
          @confirm="confirmLogout"
          @cancel="cancelLogout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, onBeforeMount, computed } from 'vue'
import TypeListData from '@/data/type-quiz.json'
import LogoutUserButton from '@/components/buttons/LogoutUserButton.vue'
import HelpUserButton from '@/components/buttons/helpUserButton.vue'
import { useUserStores } from '@/stores/userStores'
import UserDashboardSkeleton from '@/components/skeletons/UserDashboardSkeleton.vue'
import { checkDisclaimerStatus } from '@/api/getDisclaimerAgreement'
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal.vue'
import { filterQuizzesByPrivileges } from '@/utils/quizPrivileges'

const userStore = useUserStores()
const router = useRouter()
const authStore = useAuthStore()

const showLogoutErrorModal = ref(false)
const showComingSoonModal = ref(false)
const showLogoutConfirmModal = ref(false)
const logoutErrorMessage = ref('')
const disclaimerStatusCache = ref<boolean | null>(null)

const filteredQuizzes = computed(() => {
  const userPrivileges = userStore.dataUser?.quiz_privileges || 'none'
  return filterQuizzesByPrivileges(TypeListData, userPrivileges)
})

onMounted(async () => {
  // Initialize user data first
  await userStore.initializeQuiz()

  // Check disclaimer status using dedicated API to avoid data inconsistency
  try {
    const disclaimerResponse = await checkDisclaimerStatus()
    disclaimerStatusCache.value = disclaimerResponse?.data ?? true
    if (disclaimerResponse?.data === false) {
      // User hasn't agreed to disclaimer, redirect to agreement
      router.push('/agreement')
    }
    // If data is true or API fails, allow access to dashboard
  } catch (error) {
    console.error('Error checking disclaimer status:', error)
    disclaimerStatusCache.value = true
    // On error, allow access to dashboard to prevent blocking users
  }
})

onBeforeMount(() => {
  if (authStore.user?.role !== 'USER') {
    router.push('/login')
  }
})

const handleTakeQuiz = (selectedTypeQuiz: number) => {
  const quizType = TypeListData.find((q) => q.typeQuiz === selectedTypeQuiz)

  if (quizType?.disabled) {
    showComingSoonModal.value = true
    return
  }

  // Use cached disclaimer status to avoid unnecessary API call
  // If cache is null, fall back to userStore data
  const hasAgreed = disclaimerStatusCache.value ?? userStore.discalaimerAgreement

  if (!hasAgreed) {
    router.push('/agreement')
  } else {
    localStorage.setItem('type-quiz', JSON.stringify(selectedTypeQuiz))
    router.push('/quiz')
  }
}

const handleHelp = () => {
  console.info('help')
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

const handleLogout = () => {
  console.log('handleLogout called - showing confirmation modal')
  console.log('showLogoutConfirmModal before:', showLogoutConfirmModal.value)
  showLogoutConfirmModal.value = true
  console.log('showLogoutConfirmModal after:', showLogoutConfirmModal.value)
}

const confirmLogout = async () => {
  showLogoutConfirmModal.value = false
  try {
    await authStore.logout()
    router.push('/')
  } catch (error: unknown) {
    console.error('Logout error:', error)
    const errorData = error as LogoutErrorResponse

    if (errorData?.code === 401 && errorData?.message === 'token not found or invalidated') {
      logoutErrorMessage.value = 'Your session has expired. Please log in again.'
      showLogoutErrorModal.value = true
      return
    }

    logoutErrorMessage.value = errorData?.message || 'Failed to logout. Please try again.'
    showLogoutErrorModal.value = true
  }
}

const cancelLogout = () => {
  showLogoutConfirmModal.value = false
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
