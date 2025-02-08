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
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
        >
          Login
        </button>
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

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    // Basic validation
    if (!email.value || !password.value) {
      errorMessage.value = 'Please fill in all fields'
      return
    }

    const success = await authStore.login(email.value, password.value)

    if (success) {
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Invalid credentials'
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>
