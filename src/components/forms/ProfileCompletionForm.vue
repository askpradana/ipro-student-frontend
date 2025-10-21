<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
    <!-- Logout button in top right corner -->
    <div class="fixed top-8 right-8">
      <LogoutUserButton :handle-logout="handleLogout" />
    </div>

    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img
          src="/assets/iradat-konsultan.png"
          height="80"
          width="80"
          alt="company-profile"
          class="mx-auto mb-4 select-none"
        />
        <h1 class="text-2xl font-bold text-teal-600 mb-2">Lengkapi Profil Anda</h1>
        <p class="text-slate-600">Silakan lengkapi informasi profil Anda untuk melanjutkan</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-slate-700 mb-2">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
              placeholder="Masukkan nama lengkap Anda"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Grade Field -->
          <div>
            <label for="grade" class="block text-sm font-medium text-slate-700 mb-2">
              Kelas <span class="text-red-500">*</span>
            </label>
            <select
              id="grade"
              v-model="form.grade"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.grade }"
            >
              <option value="">Pilih Kelas</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <p v-if="errors.grade" class="mt-1 text-sm text-red-600">{{ errors.grade }}</p>
          </div>

          <!-- School Field -->
          <div>
            <label for="school" class="block text-sm font-medium text-slate-700 mb-2">
              Sekolah <span class="text-red-500">*</span>
            </label>
            <input
              id="school"
              v-model="form.school"
              type="text"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
              placeholder="Masukkan nama sekolah Anda"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.school }"
            />
            <p v-if="errors.school" class="mt-1 text-sm text-red-600">{{ errors.school }}</p>
          </div>

          <!-- Jurusan Field -->
          <div>
            <label for="jurusan" class="block text-sm font-medium text-slate-700 mb-2">
              Jurusan <span class="text-red-500">*</span>
            </label>
            <select
              id="jurusan"
              v-model="form.jurusan"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.jurusan }"
            >
              <option value="">Pilih Jurusan</option>
              <option value="IPA">IPA</option>
              <option value="IPS">IPS</option>
              <option value="Bahasa">Bahasa</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <p v-if="errors.jurusan" class="mt-1 text-sm text-red-600">{{ errors.jurusan }}</p>
          </div>

          <!-- Custom Jurusan Field (shown when "Lainnya" is selected) -->
          <div v-if="form.jurusan === 'Lainnya'">
            <label for="customJurusan" class="block text-sm font-medium text-slate-700 mb-2">
              Nama Jurusan <span class="text-red-500">*</span>
            </label>
            <input
              id="customJurusan"
              v-model="form.customJurusan"
              type="text"
              required
              class="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200"
              placeholder="Masukkan nama jurusan Anda"
              :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.customJurusan }"
            />
            <p v-if="errors.customJurusan" class="mt-1 text-sm text-red-600">{{ errors.customJurusan }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menyimpan...
            </span>
            <span v-else>Simpan & Lanjutkan</span>
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
      </div>


      <!-- Confirmation Modal -->
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" @click="cancelSubmit"></div>

        <!-- Modal Content -->
        <div class="relative z-50 transform px-4">
          <ProfileUpdateConfirmModal
            :profile-data="confirmData"
            @confirm="confirmSubmit"
            @cancel="cancelSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUpdateProfileApi } from '@/api/useUpdateProfile'
import { useUserStores } from '@/stores/userStores'
import { useAuthStore } from '@/stores/auth'
import ProfileUpdateConfirmModal from '@/components/modals/ProfileUpdateConfirmModal.vue'
import LogoutUserButton from '@/components/buttons/LogoutUserButton.vue'

const router = useRouter()
const userStore = useUserStores()
const authStore = useAuthStore()
const { updateProfile, loading, error } = useUpdateProfileApi()

const form = reactive({
  name: '',
  grade: '',
  school: '',
  jurusan: '',
  customJurusan: ''
})

const errors = reactive({
  name: '',
  grade: '',
  school: '',
  jurusan: '',
  customJurusan: ''
})

const errorMessage = ref('')
const showConfirmModal = ref(false)
const confirmData = ref({
  name: '',
  grade: '',
  school: '',
  jurusan: ''
})

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  let isValid = true

  // Validate name
  if (!form.name.trim()) {
    errors.name = 'Nama lengkap wajib diisi'
    isValid = false
  } else if (form.name.trim().length < 3) {
    errors.name = 'Nama minimal 3 karakter'
    isValid = false
  }

  // Validate grade
  if (!form.grade) {
    errors.grade = 'Kelas wajib dipilih'
    isValid = false
  }

  // Validate school
  if (!form.school.trim()) {
    errors.school = 'Sekolah wajib diisi'
    isValid = false
  } else if (form.school.trim().length < 3) {
    errors.school = 'Nama sekolah minimal 3 karakter'
    isValid = false
  }

  // Validate jurusan
  if (!form.jurusan) {
    errors.jurusan = 'Jurusan wajib dipilih'
    isValid = false
  }

  // Validate custom jurusan if "Lainnya" is selected
  if (form.jurusan === 'Lainnya') {
    if (!form.customJurusan.trim()) {
      errors.customJurusan = 'Nama jurusan wajib diisi'
      isValid = false
    } else if (form.customJurusan.trim().length < 3) {
      errors.customJurusan = 'Nama jurusan minimal 3 karakter'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!validateForm()) {
    return
  }

  // Use custom jurusan if "Lainnya" is selected, otherwise use the selected option
  const finalJurusan = form.jurusan === 'Lainnya' ? form.customJurusan.trim() : form.jurusan

  // Prepare confirmation data and show modal
  confirmData.value = {
    name: form.name.trim(),
    grade: form.grade,
    school: form.school.trim(),
    jurusan: finalJurusan
  }

  showConfirmModal.value = true
}

const confirmSubmit = async () => {
  showConfirmModal.value = false

  try {
    await updateProfile(confirmData.value)

    // Refresh user data to get updated profile
    await userStore.initializeQuiz()

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    console.error('Profile update error:', err)
    errorMessage.value = error.value || 'Terjadi kesalahan saat menyimpan profil. Silakan coba lagi.'
  }
}

const cancelSubmit = () => {
  showConfirmModal.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>