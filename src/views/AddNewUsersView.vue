<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Users</h1>

    <!-- School Information -->
    <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
      <h2 class="text-lg font-semibold mb-4">School Information</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            School Name <span class="text-red-500">*</span>
          </label>
          <input
            v-model="newUsersData.school"
            type="text"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            placeholder="Enter school name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Test Period <span class="text-red-500">*</span>
          </label>
          <Datepicker
            v-model="newUsersData.testPeriod"
            class="w-full"
            :enable-time-picker="false"
            :format="formatDate"
            placeholder="Select test period"
            :min-date="new Date()"
            autoApply
            textInput
          />
        </div>
      </div>
    </div>

    <!-- Add validation messages -->
    <div v-if="hasSubmitAttempt && validationMessages.length > 0" class="mb-6">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 class="text-red-700 font-medium mb-2">Please fix the following errors:</h3>
        <ul class="list-disc list-inside text-red-600">
          <li v-for="message in validationMessages" :key="message">{{ message }}</li>
        </ul>
      </div>
    </div>

    <!-- Students Section -->
    <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Students <span class="text-red-500">*</span></h2>
        <button
          @click="addStudent"
          class="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Add Student
        </button>
      </div>

      <div
        v-for="(user, index) in newUsersData.users"
        :key="index"
        class="mb-4 p-4 border rounded-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="user.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="Student name"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Grade</label>
            <select
              v-model="user.grade"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option value="">Select grade</option>
              <option v-for="grade in GRADES" :key="grade" :value="grade">Grade {{ grade }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
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
              class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Viewers Section -->
    <div class="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Viewers <span class="text-red-500">*</span></h2>
        <button
          @click="addViewer"
          class="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700"
        >
          Add Viewer
        </button>
      </div>

      <div
        v-for="(viewer, index) in newUsersData.viewers"
        :key="index"
        class="mb-4 p-4 border rounded-lg"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              v-model="viewer.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="Viewer name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="viewer.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="viewer@email.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              v-model="viewer.phoneNumber"
              type="tel"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              placeholder="+1234567890"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="removeViewer(index)"
              class="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4">
      <button
        @click="router.push('/admin/dashboard')"
        class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        @click="saveNewUsers"
        class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        Save
      </button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useModalStore } from '@/stores/modalStore'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import ModalAlert from '@/components/modals/ModalAlert.vue'
import { notify } from '@/lib/notify'

const router = useRouter()
const adminStore = useAdminStore()
const modalStore = useModalStore()
const GRADES = ['9', '10', '11', '12']
const hasSubmitAttempt = ref(false)

interface NewUser {
  name: string
  email: string
  grade: string
  phoneNumber: string
}

interface NewViewer {
  name: string
  email: string
  phoneNumber: string
}

const newUsersData = ref({
  school: '',
  testPeriod: new Date(),
  users: [{ name: '', email: '', grade: '', phoneNumber: '' }] as NewUser[],
  viewers: [] as NewViewer[],
})

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const addStudent = () => {
  newUsersData.value.users.push({ name: '', email: '', grade: '', phoneNumber: '' })
}

const removeStudent = (index: number) => {
  newUsersData.value.users.splice(index, 1)
}

const addViewer = () => {
  newUsersData.value.viewers.push({ name: '', email: '', phoneNumber: '' })
}

const removeViewer = (index: number) => {
  newUsersData.value.viewers.splice(index, 1)
}

const isFormValid = computed(() => {
  const hasSchool = !!newUsersData.value.school.trim()
  const hasPeriod = !!newUsersData.value.testPeriod
  const hasValidUsers =
    newUsersData.value.users.length > 0 &&
    newUsersData.value.users.every(
      (user) => user.name.trim() && user.email.trim() && user.grade && user.phoneNumber.trim(),
    )
  const hasValidViewers =
    newUsersData.value.viewers.length > 0 &&
    newUsersData.value.viewers.every(
      (viewer) => viewer.name.trim() && viewer.email.trim() && viewer.phoneNumber.trim(),
    )

  return hasSchool && hasPeriod && hasValidUsers && hasValidViewers
})

// Add validation messages
const validationMessages = computed(() => {
  const messages = []

  if (!newUsersData.value.school.trim()) {
    messages.push('School name is required')
  }

  if (!newUsersData.value.testPeriod) {
    messages.push('Test period is required')
  }

  if (newUsersData.value.users.length === 0) {
    messages.push('At least one student is required')
  } else {
    const invalidUsers = newUsersData.value.users.filter(
      (user) => !user.name.trim() || !user.email.trim() || !user.grade || !user.phoneNumber.trim(),
    )
    if (invalidUsers.length > 0) {
      messages.push('All student fields (name, email, grade, phone number) are required')
    }
  }

  if (newUsersData.value.viewers.length === 0) {
    messages.push('At least one viewer is required')
  } else {
    const invalidViewers = newUsersData.value.viewers.filter(
      (viewer) => !viewer.name.trim() || !viewer.email.trim() || !viewer.phoneNumber.trim(),
    )
    if (invalidViewers.length > 0) {
      messages.push('All viewer fields (name, email, phone number) are required')
    }
  }

  return messages
})

const saveNewUsers = async () => {
  try {
    hasSubmitAttempt.value = true

    if (!isFormValid.value) {
      // Scroll to the top where validation messages are shown
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const users = newUsersData.value.users.map((user) => ({
      ...user,
      school: newUsersData.value.school,
      testPeriod: newUsersData.value.testPeriod,
    }))

    await adminStore.addMultipleUsers(users, newUsersData.value.viewers)
    notify('Users added successfully!', 'success')
    router.push('/admin/dashboard')
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to add users. Please try again.'
    notify(errorMessage, 'error')
  }
}
</script>
