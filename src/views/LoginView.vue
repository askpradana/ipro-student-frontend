<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4"
  >
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2
        class="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        Login to iPro student
      </h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all duration-300"
              required
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 focus:outline-none transition-transform duration-300 ease-in-out"
              :class="{ 'rotate-180': showPassword }"
            >
              <div class="relative w-5 h-5">
                <svg
                  class="absolute inset-0 transform transition-opacity duration-300"
                  :class="{ 'opacity-0': !showPassword, 'opacity-100': showPassword }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <svg
                  class="absolute inset-0 transform transition-opacity duration-300"
                  :class="{ 'opacity-100': !showPassword, 'opacity-0': showPassword }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
        <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

// Email regex: Allows standard email format while preventing XSS
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// Password regex: Minimum 8 characters, at least one uppercase, one lowercase, one number
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
const PASSWORD_REGEX = /^.{8,}$/

const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email)
}

const validatePassword = (password: string): boolean => {
  return PASSWORD_REGEX.test(password)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    // Enhanced validation
    if (!email.value || !password.value) {
      errorMessage.value = 'Please fill in all fields'
      return
    }

    if (!validateEmail(email.value)) {
      errorMessage.value = 'Please enter a valid email address'
      return
    }

    if (!validatePassword(password.value)) {
      errorMessage.value =
        'Password must be at least 8 characters long and contain uppercase, lowercase, and numbers'
      return
    }

    const role = await authStore.login(email.value, password.value)

    // Add console.log to debug the role
    console.log('User role:', role)

    if (role === 'ADMIN') {
      router.push('/admin/dashboard')
    } else if (role === 'USER') {
      router.push('/dashboard')
    } else {
      console.error('Unknown role:', role)
    }
  } catch (error) {
    // console.error('Login error:', error)
    errorMessage.value = error instanceof Error ? error.message : 'An error occurred during login'
  } finally {
    password.value = ''
    loading.value = false
  }
}
</script>
