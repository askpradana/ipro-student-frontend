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
    <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
      <!-- Quiz Button -->
      <button
        v-for="type in TypeListData"
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted, onBeforeMount } from 'vue'
import TypeListData from '@/data/type-quiz.json'
import LogoutUserButton from '@/components/buttons/LogoutUserButton.vue'
import HelpUserButton from '@/components/buttons/helpUserButton.vue'
import { useUserStores } from '@/stores/userStores'
import UserDashboardSkeleton from '@/components/skeletons/UserDashboardSkeleton.vue'

const userStore = useUserStores()
const router = useRouter()
const authStore = useAuthStore()

const showLogoutErrorModal = ref(false)
const showComingSoonModal = ref(false)
const logoutErrorMessage = ref('')

onMounted(() => {
  userStore.initializeQuiz().then(() => {
    if (!userStore.discalaimerAgreement) {
      router.push('/agreement')
    }
  })
})

onBeforeMount(() => {
  if (authStore.user?.role !== 'USER') {
    router.push('/viewer/dashboard')
  }
})

const handleTakeQuiz = (selectedTypeQuiz: number) => {
  const quizType = TypeListData.find((q) => q.typeQuiz === selectedTypeQuiz)

  if (quizType?.disabled) {
    showComingSoonModal.value = true
    return
  }

  if (!userStore.discalaimerAgreement) {
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

const handleLogout = async () => {
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
