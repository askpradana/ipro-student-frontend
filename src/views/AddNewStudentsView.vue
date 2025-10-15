<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Tambahkan Murid</h1>
    <!-- School Information -->
    <LoadingSpinner v-if="loading" />
    <template v-else-if="!loading">
      <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 class="text-lg font-semibold mb-4">Informasi Sekolah</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah</label>
            <select
              v-model="newUsersData.school"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="Masukan nama sekolah"
            >
              <option disabled value="">Pilih Sekolah</option>
              <option v-for="school in listSchool" :key="school" :value="school">
                {{ school }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Add validation messages -->
      <div v-if="hasSubmitAttempt && validationMessages.length > 0" class="mb-6">
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 class="text-red-700 font-medium mb-2">Harap perbaiki kesalahan berikut:</h3>
          <ul class="list-disc list-inside text-red-600">
            <li v-for="message in validationMessages" :key="message">{{ message }}</li>
          </ul>
        </div>
      </div>

      <!-- Students Section -->
      <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">Murid <span class="text-red-500">*</span></h2>
          <button
            @click="addStudent"
            class="px-4 py-2 text-sm text-white rounded-lg"
            :class="
              submitLoading ? 'bg-teal-200 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
            "
            :disabled="submitLoading"
          >
            Tambah Murid
          </button>
        </div>

        <div
          v-for="(user, index) in newUsersData.users"
          :key="index"
          class="mb-4 p-4 border rounded-lg"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                v-model="user.name"
                type="text"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="Nama Murid"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="student@email.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <select
                v-model="user.grade"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Pilih Kelas</option>
                <option v-for="grade in GRADES" :key="grade" :value="grade">
                  Kelas {{ grade }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
              <input
                v-model="user.jurusan"
                type="text"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="Jurusan"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
              <input
                v-model="user.phoneNumber"
                type="tel"
                class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="+1234567890"
              />
            </div>
            <div class="flex items-end md:col-span-2 justify-end">
              <button
                @click="removeStudent(index)"
                class="px-4 py-2 text-sm text-red-600 rounded-lg"
                :class="submitLoading ? 'bg-slate-200 cursor-not-allowed' : 'hover:bg-red-50'"
                :disabled="submitLoading"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>


      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <button
          @click="router.push('/admin/dashboard')"
          class="px-6 py-2 border border-gray-300 rounded-lg"
          :class="submitLoading ? 'bg-slate-200 cursor-not-allowed' : 'hover:bg-gray-50'"
          :disabled="submitLoading"
        >
          Batal
        </button>
        <button
          @click="saveNewStudents"
          class="px-6 py-2 bg-teal-600 text-white rounded-lg"
          :class="
            submitLoading ? 'bg-teal-200 cursor-not-allowed' : 'bg-teal-600  hover:bg-teal-700'
          "
          :disabled="submitLoading"
        >
          Simpan
        </button>
      </div>
    </template>

    <!-- Add Modal Components -->
    <ModalContainer>
      <ModalAlert
        v-if="modalStore.typeModal === 'success' || modalStore.typeModal === 'error'"
        :title-modal="modalStore.typeModal === 'success' ? 'Success' : 'Error'"
        :message="modalStore.message"
        :type="modalStore.typeModal"
      />
    </ModalContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { getListSchool } from '@/api/getListSchools'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import ModalAlert from '@/components/modals/ModalAlert.vue'
import LoadingSpinner from '@/components/skeletons/LoadingSpinner.vue'
import { notify } from '@/lib/notify'
import type { NewUser } from '@/types/formNewUserTypes'
import { postNewStudents } from '@/api/postMultipleStudents'

const router = useRouter()
const modalStore = useModalStore()
const loading = ref(false)
const submitLoading = ref(false)
const listSchool = ref()
const GRADES = ['9', '10', '11', '12']
const hasSubmitAttempt = ref(false)

onMounted(() => {
  loading.value = true
  getListSchool()
    .then((res) => {
      listSchool.value = res?.data
    })
    .catch(() => {
      notify('Error cannot take school data', 'error')
    })
    .finally(() => (loading.value = false))
})

const newUsersData = ref({
  school: '',
  users: [{ name: '', email: '', grade: '', phoneNumber: '', jurusan: '' }] as NewUser[],
})


const addStudent = () => {
  newUsersData.value.users.push({ name: '', email: '', grade: '', phoneNumber: '', jurusan: '' })
}

const removeStudent = (index: number) => {
  newUsersData.value.users.splice(index, 1)
}


const isFormValid = computed(() => {
  const hasSchool = !!newUsersData.value.school.trim()
  const hasValidUsers =
    newUsersData.value.users.length > 0 &&
    newUsersData.value.users.every(
      (user) =>
        user.name.trim() &&
        user.email.trim() &&
        user.grade &&
        user.phoneNumber.trim() &&
        user.jurusan.trim(),
    )

  return hasSchool && hasValidUsers
})

// Add validation messages
const validationMessages = computed(() => {
  const messages = []

  if (!newUsersData.value.school.trim()) {
    messages.push('School name is required')
  }


  if (newUsersData.value.users.length === 0) {
    messages.push('At least one student is required')
  } else {
    const invalidUsers = newUsersData.value.users.filter(
      (user) =>
        !user.name.trim() ||
        !user.email.trim() ||
        !user.grade ||
        !user.phoneNumber.trim() ||
        !user.jurusan.trim(),
    )
    if (invalidUsers.length > 0) {
      messages.push('All student fields (name, email, grade, phone number, jurusan) are required')
    }
  }


  return messages
})

const saveNewStudents = async () => {
  try {
    hasSubmitAttempt.value = true

    if (!isFormValid.value) {
      // Scroll to the top where validation messages are shown
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    submitLoading.value = true

    const users = newUsersData.value.users.map((user) => ({
      ...user,
      school: newUsersData.value.school,
    }))

    const newData = {
      school: newUsersData.value.school,
      users: users,
    }

    await postNewStudents(newData)

    notify('Students added successfully!', 'success')
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 2200)
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to add students. Please try again.'
    notify(errorMessage, 'error')
  } finally {
    setTimeout(() => {
      submitLoading.value = false
    }, 2200)
  }
}
</script>
