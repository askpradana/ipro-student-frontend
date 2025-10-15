<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1
          class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </h1>
        <button
          @click="handleLogout"
          class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Keluar
        </button>
      </div>

      <!-- Add loading and error states -->
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6"
      >
        {{ error }}
        <button @click="fetchData" class="ml-2 underline hover:text-red-700">Try again</button>
      </div>

      <!-- Only show the rest of the content when not loading and no error -->
      <template v-else>
        <!-- Add search controls -->
        <div class="mb-6 flex space-x-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Pencarian..."
            class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          <select
            v-model="searchField"
            class="rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          >
            <option value="name">Nama</option>
            <option value="email">Email</option>
            <option value="school">Sekolah</option>
            <option value="grade">Kelas</option>
            <option value="jurusan">Jurusan</option>
            <!-- <option value="createdBy">Dibuat oleh</option> -->
          </select>
        </div>

        <!-- Button controls - conditional based on selection mode -->
        <div class="mb-6 flex justify-end gap-2 items-center">
          <!-- Normal mode: Show "Tambah Murid" -->
          <router-link
            v-if="!isSelectionMode"
            to="/admin/add-students"
            class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Tambah Murid
          </router-link>

          <!-- Selection mode: Show privilege controls, export buttons and selection info -->
          <div v-else class="flex items-center gap-3">
            <span class="text-sm text-gray-600 font-medium">
              {{ selectedCount }} user{{ selectedCount > 1 ? 's' : '' }} selected
            </span>
            <!-- Privilege controls -->
            <div class="flex items-center gap-2">
              <select
                v-model="selectedPrivilege"
                class="rounded-lg border border-gray-300 px-3 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select Privilege</option>
                <option value="none">None</option>
                <option value="quiz">Quiz (3-7 + PPI)</option>
                <option value="riasec">RIASEC</option>
                <option value="full">Full Access</option>
              </select>
              <button
                @click="handleUpdatePrivileges"
                :disabled="!selectedPrivilege || updatingPrivileges"
                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {{ updatingPrivileges ? 'Updating...' : 'Update Privileges' }}
              </button>
            </div>
            <button
              @click="handleExportQuiz"
              :disabled="exportingQuiz"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ exportingQuiz ? 'Exporting...' : 'Export Quiz' }}
            </button>
            <button
              @click="handleExportRiasec"
              :disabled="exportingRiasec"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ exportingRiasec ? 'Exporting...' : 'Export RIASEC' }}
            </button>
            <button
              @click="clearSelection"
              class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <!-- Add after search controls, before the table -->
        <div class="mb-4 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <label class="text-sm text-gray-600">Show</label>
            <select
              v-model="itemsPerPage"
              class="rounded-lg border border-gray-300 px-3 py-1 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
            <span class="text-sm text-gray-600">entries</span>
          </div>
          <div class="text-sm text-gray-600">
            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredUsers.length) }} of
            {{ filteredUsers.length }} entries
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header"
                  class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <!-- Empty state when no users -->
              <tr v-if="filteredUsers.length === 0">
                <td :colspan="tableHeaders.length" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg
                      class="w-12 h-12 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p class="text-lg font-medium">Tidak ada pengguna ditemukan</p>
                    <p class="text-sm mt-1">Belum ada data pengguna atau hasil pencarian kosong</p>
                  </div>
                </td>
              </tr>
              <!-- User rows -->
              <tr
                v-for="user in paginatedUsers"
                :key="user.id"
                v-else
                :class="{ 'bg-teal-50': selectedUsers.has(user.id) }"
              >
                <!-- Selection Column -->
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    @click="toggleSelection(user.id)"
                    @keydown.space.prevent="toggleSelection(user.id)"
                    class="w-5 h-5 rounded-md border-2 transition-all duration-150 ease-in-out focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    :class="[
                      selectedUsers.has(user.id)
                        ? 'bg-teal-600 border-teal-600 hover:bg-teal-700'
                        : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50',
                    ]"
                    :aria-label="`Select ${user.name} for export`"
                    :aria-checked="selectedUsers.has(user.id)"
                    role="checkbox"
                    tabindex="0"
                  >
                    <svg
                      v-if="selectedUsers.has(user.id)"
                      class="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                  {{ user.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                  {{ user.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ user.grade }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left">
                  {{ user.school }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ user.jurusan }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-gray-100 text-gray-800': user.quizPrivileges === 'none',
                      'bg-blue-100 text-blue-800': user.quizPrivileges === 'quiz',
                      'bg-purple-100 text-purple-800': user.quizPrivileges === 'riasec',
                      'bg-green-100 text-green-800': user.quizPrivileges === 'full',
                    }"
                  >
                    {{ user.quizPrivileges }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <QuizStatusBadges :quiz-status="user.quizStatus" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ formatDate(user.lastLogin) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ user.attemptLogin }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ user.createdBy }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="openEditModal(user)"
                      class="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleResetPassword(user.id)"
                      class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
                    >
                      Reset Password
                    </button>
                    <button
                      @click="handleResetQuizProgress(user)"
                      class="bg-orange-100 text-orange-600 px-3 py-1 rounded hover:bg-orange-200"
                    >
                      Reset Quiz
                    </button>
                    <button
                      @click="handleDeleteUser(user.id)"
                      class="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add after the table -->
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm text-gray-600">Page {{ currentPage }} of {{ totalPages }}</div>
          <div class="flex space-x-2">
            <button
              @click="currentPage = 1"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border"
              :class="
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50'
              "
            >
              First
            </button>
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 rounded border"
              :class="
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50'
              "
            >
              Previous
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border"
              :class="
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50'
              "
            >
              Next
            </button>
            <button
              @click="currentPage = totalPages"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 rounded border"
              :class="
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white hover:bg-gray-50'
              "
            >
              Last
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- Edit Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Edit User</h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
            <input
              v-model="editingUser.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="editingUser.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
            <select
              v-model="editingUser.grade"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            >
              <option v-for="grade in GRADES" :key="grade" :value="grade">Grade {{ grade }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Sekolah</label>
            <input
              v-model="editingUser.school"
              type="text"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <!-- <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Test Completion</label>
            <input
              v-model="editingUser.testCompletedAt"
              type="datetime-local"
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div> -->
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button
            @click="closeEditModal"
            class="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            @click="saveChanges(editingUser)"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>

    <!-- Add this modal dialog near the end of the template, before closing </div> -->
    <div
      v-if="showLogoutErrorModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl p-6 max-w-lg w-full">
        <h2 class="text-xl font-bold mb-4">Logout Error</h2>
        <p class="text-gray-600 mb-6">{{ logoutErrorMessage }}</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="forceLogout"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Proceed to Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div
      v-if="showResetPasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96">
        <h2 class="text-xl font-bold mb-4">Reset Password</h2>
        <div class="mb-4">
          <p class="text-gray-600 mb-2">Reset password untuk:</p>
          <p class="font-medium">{{ resetPasswordEmail }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="newPassword"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Masukan password baru"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              tabindex="-1"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.818 6.818M9.878 9.878a3 3 0 014.242 4.242m6.96 3.96L21 21M3 3l2.818 2.818m0 0A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5 text-gray-400"
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
            </button>
          </div>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Konfirmasi Password Baru</label
          >
          <div class="relative">
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Konfirmasi password baru"
              :class="{ 'border-red-500': confirmPassword && !passwordsMatch }"
            />
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              tabindex="-1"
            >
              <svg
                v-if="showConfirmPassword"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.818 6.818M9.878 9.878a3 3 0 014.242 4.242m6.96 3.96L21 21M3 3l2.818 2.818m0 0A9.954 9.954 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                class="h-5 w-5 text-gray-400"
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
            </button>
          </div>
          <p v-if="confirmPassword && !passwordsMatch" class="text-red-500 text-sm mt-1">
            Password tidak cocok
          </p>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeResetPasswordModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Batal
          </button>
          <button
            @click="submitResetPassword"
            class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="!newPassword || !confirmPassword || !passwordsMatch"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>

    <!-- Add Modal Components -->
    <ModalContainer>
      <ModalAlert
        v-if="modalStore.typeModal === 'success' || modalStore.typeModal === 'error'"
        :title-modal="modalStore.typeModal === 'success' ? 'Success' : 'Error'"
        :message="modalStore.message"
        :type="modalStore.typeModal"
      />
    </ModalContainer>

    <!-- Export Component -->
    <ExportQuizRiasec
      ref="exportQuizRiasecRef"
      :user-ids="Array.from(selectedUsers)"
      @export-complete="handleExportComplete"
    />

    <!-- Quiz Reset Confirmation Modal -->
    <div
      v-if="showQuizResetModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <QuizResetConfirmModal
        :user-name="resetQuizUserName"
        @confirm="confirmResetQuiz"
        @cancel="cancelResetQuiz"
      />
    </div>

    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <LogoutConfirmModal @confirm="confirmLogout" @cancel="cancelLogout" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAdminStore, type EditingUser, type User } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import ModalAlert from '@/components/modals/ModalAlert.vue'
import QuizStatusBadges from '@/components/ui/QuizStatusBadges.vue'
import ExportQuizRiasec from '@/components/exports/ExportQuizRiasec.vue'
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal.vue'
import QuizResetConfirmModal from '@/components/modals/QuizResetConfirmModal.vue'

const adminStore = useAdminStore()
const authStore = useAuthStore()
const router = useRouter()
const showEditModal = ref(false)
const searchQuery = ref('')
const searchField = ref('name')

const editingUser = ref<EditingUser>({
  id: '',
  name: '',
  email: '',
  grade: '',
  school: '',
  jurusan: '',
  lastLogin: null,
  attemptLogin: 0,
  createdAt: '',
  createdBy: '',
  phoneNumber: '',
  quizPrivileges: 'none',
  quizStatus: {
    QUIZ3: false,
    QUIZ5: false,
    QUIZ6: false,
    QUIZ7: false,
    PPI: false,
    RIASEC: false,
  },
})

const tableHeaders = [
  '',
  'Nama',
  'Email',
  'Kelas',
  'Sekolah',
  'Jurusan',
  'Quiz Privileges',
  'Quiz Completed',
  'Terakhir Login',
  'Percobaan Login',
  'Dibuat Pada',
  'Dibuat oleh',
  'Aksi',
] as const

const GRADES = ['9', '10', '11', '12'] as const
// const SCHOOLS = ['Springfield High School', 'Riverside Academy', 'Central Valley School'] as const

const currentPage = ref(1)
const itemsPerPage = ref(10)
const pageSizes = [10, 50, 100]

const isLoading = ref(true)
const error = ref<string | null>(null)

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

const openEditModal = (user: User): void => {
  editingUser.value = {
    id: user.id,
    name: user.name,
    email: user.email,
    grade: user.grade,
    school: user.school,
    jurusan: user.jurusan || '',
    lastLogin: formatDate(user.lastLogin),
    attemptLogin: user.attemptLogin,
    createdAt: formatDate(user.createdAt),
    createdBy: user.createdBy,
    phoneNumber: user.phoneNumber || '',
    quizPrivileges: user.quizPrivileges,
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
    jurusan: '',
    lastLogin: null,
    attemptLogin: 0,
    createdAt: '',
    createdBy: '',
    phoneNumber: '',
    quizPrivileges: 'none',
    quizStatus: {
      QUIZ3: false,
      QUIZ5: false,
      QUIZ6: false,
      QUIZ7: false,
      PPI: false,
      RIASEC: false,
    },
  }
}

const modalStore = useModalStore()

const saveChanges = async (updatedUser: EditingUser) => {
  try {
    await adminStore.updateUserApi({
      ...updatedUser,
      lastLogin: updatedUser.lastLogin || null,
      createdAt: updatedUser.createdAt || '',
    })
    showEditModal.value = false
    fetchData()
  } catch (error: unknown) {
    console.error('Error menyimpan perubahan:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal menyimpan perubahan. Silahkan coba lagi.'
    modalStore.openModal()
  }
}

const handleDeleteUser = async (userId: string) => {
  try {
    await adminStore.deleteUser(userId)
    fetchData()
  } catch (error: unknown) {
    console.error('Error menghapus user:', error)
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal menghapus data. Silahkan coba lagi.'
    modalStore.openModal()
  }
}

// Add computed property for password matching
const passwordsMatch = computed(() => {
  return newPassword.value === confirmPassword.value
})

// Add computed property for filtered users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return adminStore.users
  return adminStore.users.filter((user) => {
    const field = searchField.value as keyof typeof user
    const searchValue = user[field]?.toString().toLowerCase() || ''
    return searchValue.includes(searchQuery.value.toLowerCase())
  })
})

// Add these computed properties
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => startIndex.value + itemsPerPage.value)

// Modify the existing filteredUsers computed to include pagination
const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(startIndex.value, endIndex.value)
})

// Watch for changes that should reset pagination
watch([itemsPerPage, searchQuery], () => {
  currentPage.value = 1
})

// Add these refs
const showLogoutErrorModal = ref(false)
const showLogoutConfirmModal = ref(false)
const logoutErrorMessage = ref('')

const showResetPasswordModal = ref(false)
const resetPasswordEmail = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Quiz reset modal state
const showQuizResetModal = ref(false)
const resetQuizUserId = ref('')
const resetQuizUserName = ref('')

// Export loading states
const exportingQuiz = ref(false)
const exportingRiasec = ref(false)

// Privilege update states
const selectedPrivilege = ref<'none' | 'quiz' | 'riasec' | 'full' | ''>('')
const updatingPrivileges = ref(false)

// Export component ref
const exportQuizRiasecRef = ref<InstanceType<typeof ExportQuizRiasec> | null>(null)

// Selection state management
const selectedUsers = ref<Set<string>>(new Set())
const isSelectionMode = computed(() => selectedUsers.value.size > 0)
const selectedCount = computed(() => selectedUsers.value.size)

// Selection methods
const toggleSelection = (userId: string) => {
  if (selectedUsers.value.has(userId)) {
    selectedUsers.value.delete(userId)
  } else {
    selectedUsers.value.add(userId)
  }
  // Force reactivity update
  selectedUsers.value = new Set(selectedUsers.value)
}

const clearSelection = () => {
  selectedUsers.value.clear()
  selectedPrivilege.value = ''
}

const selectAll = () => {
  filteredUsers.value.forEach((user) => {
    selectedUsers.value.add(user.id)
  })
  selectedUsers.value = new Set(selectedUsers.value)
}

// Export handlers
const handleExportQuiz = async () => {
  if (selectedUsers.value.size === 0) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Please select at least one user to export.'
    modalStore.openModal()
    return
  }

  if (!exportQuizRiasecRef.value) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Export component not available. Please refresh and try again.'
    modalStore.openModal()
    return
  }

  exportingQuiz.value = true
  try {
    // Use the PDF export component for quiz only
    await exportQuizRiasecRef.value.exportQuizToPDF()
  } catch (error) {
    console.error('Error exporting quiz data:', error)
    modalStore.typeOfModal('error')
    modalStore.message =
      (error as Error)?.message || 'Failed to export quiz data. Please try again.'
    modalStore.openModal()
  } finally {
    exportingQuiz.value = false
  }
}

// Export completion callback
const handleExportComplete = (success: boolean, message: string) => {
  modalStore.typeOfModal(success ? 'success' : 'error')
  modalStore.message = message
  modalStore.openModal()

  if (success) {
    clearSelection()
  }

  exportingQuiz.value = false
  exportingRiasec.value = false
}

const handleUpdatePrivileges = async () => {
  if (selectedUsers.value.size === 0 || !selectedPrivilege.value) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Please select users and privilege level.'
    modalStore.openModal()
    return
  }

  updatingPrivileges.value = true
  try {
    // Get emails of selected users
    const selectedUserEmails = Array.from(selectedUsers.value)
      .map((userId) => {
        const user = adminStore.users.find((u) => u.id === userId)
        return user?.email
      })
      .filter((email): email is string => Boolean(email))

    if (selectedUserEmails.length === 0) {
      throw new Error('No valid user emails found')
    }

    await adminStore.updateUserPrivileges(
      selectedUserEmails,
      selectedPrivilege.value as 'none' | 'quiz' | 'riasec' | 'full'
    )

    modalStore.typeOfModal('success')
    modalStore.message = `Successfully updated privileges for ${selectedUserEmails.length} user(s)`
    modalStore.openModal()

    // Refresh the user list and clear selection
    await fetchData()
    clearSelection()
  } catch (error) {
    console.error('Error updating privileges:', error)
    modalStore.typeOfModal('error')
    modalStore.message =
      (error as Error)?.message || 'Failed to update privileges. Please try again.'
    modalStore.openModal()
  } finally {
    updatingPrivileges.value = false
  }
}

const handleExportRiasec = async () => {
  if (selectedUsers.value.size === 0) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Please select at least one user to export.'
    modalStore.openModal()
    return
  }

  if (!exportQuizRiasecRef.value) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Export component not available. Please refresh and try again.'
    modalStore.openModal()
    return
  }

  exportingRiasec.value = true
  try {
    // Use the PDF export component for RIASEC only
    await exportQuizRiasecRef.value.exportRiasecToPDF()
  } catch (error) {
    console.error('Error exporting RIASEC data:', error)
    modalStore.typeOfModal('error')
    modalStore.message =
      (error as Error)?.message || 'Failed to export RIASEC data. Please try again.'
    modalStore.openModal()
  } finally {
    exportingRiasec.value = false
  }
}

// Replace the existing handleLogout function
const handleLogout = () => {
  showLogoutConfirmModal.value = true
}

const confirmLogout = async () => {
  showLogoutConfirmModal.value = false
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error: unknown) {
    console.error('Logout failed:', error)
    // Show the error modal with the message from the API
    logoutErrorMessage.value =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
      'Failed to logout. Please try again.'
    showLogoutErrorModal.value = true
  }
}

const cancelLogout = () => {
  showLogoutConfirmModal.value = false
}

// Add this new function to handle forced logout
const forceLogout = () => {
  showLogoutErrorModal.value = false
  // Clear any necessary auth state
  authStore.$reset()
  // Redirect to login page
  router.push('/login')
}

const handleResetPassword = async (userId: string) => {
  const user = adminStore.users.find((u) => u.id === userId)
  if (user) {
    resetPasswordEmail.value = user.email
    showResetPasswordModal.value = true
  }
}

const closeResetPasswordModal = () => {
  showResetPasswordModal.value = false
  resetPasswordEmail.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  showPassword.value = false
  showConfirmPassword.value = false
}

const submitResetPassword = async () => {
  if (!passwordsMatch.value) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Password tidak cocok!'
    modalStore.openModal()
    return
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/admin/users/reset-password`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authStore.getToken}`,
        },
        body: JSON.stringify({
          email: resetPasswordEmail.value,
          new_password: newPassword.value,
        }),
      },
    )

    if (response.ok) {
      modalStore.typeOfModal('success')
      modalStore.message = 'Password berhasil direset!'
      modalStore.openModal()
      closeResetPasswordModal()
    } else {
      modalStore.typeOfModal('error')
      modalStore.message = 'Gagal mereset password'
      modalStore.openModal()
    }
  } catch (error) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal mereset password'
    modalStore.openModal()
    console.log(error)
  }
}

// Quiz reset functions
const handleResetQuizProgress = (user: User) => {
  resetQuizUserId.value = user.id
  resetQuizUserName.value = user.name
  showQuizResetModal.value = true
}

const confirmResetQuiz = async () => {
  showQuizResetModal.value = false

  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/admin/quizzes/reset`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.getToken}`,
      },
      body: JSON.stringify({
        userID: resetQuizUserId.value,
      }),
    })

    if (response.ok) {
      modalStore.typeOfModal('success')
      modalStore.message = `Progress quiz untuk ${resetQuizUserName.value} berhasil direset!`
      modalStore.openModal()
      fetchData() // Refresh the user list
    } else {
      const errorData = await response.json()
      modalStore.typeOfModal('error')
      modalStore.message = errorData.message || 'Gagal mereset progress quiz'
      modalStore.openModal()
    }
  } catch (error) {
    modalStore.typeOfModal('error')
    modalStore.message = 'Gagal mereset progress quiz. Silakan coba lagi.'
    modalStore.openModal()
    console.error('Error resetting quiz progress:', error)
  } finally {
    resetQuizUserId.value = ''
    resetQuizUserName.value = ''
  }
}

const cancelResetQuiz = () => {
  showQuizResetModal.value = false
  resetQuizUserId.value = ''
  resetQuizUserName.value = ''
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

// Keyboard shortcuts
const handleKeyboardShortcuts = (event: KeyboardEvent) => {
  // Escape key to clear selection
  if (event.key === 'Escape' && isSelectionMode.value) {
    clearSelection()
    event.preventDefault()
  }
  // Ctrl+A to select all
  if (event.ctrlKey && event.key === 'a' && !isSelectionMode.value) {
    selectAll()
    event.preventDefault()
  }
}

onMounted(() => {
  fetchData()
  // Add keyboard event listener
  document.addEventListener('keydown', handleKeyboardShortcuts)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyboardShortcuts)
})
</script>
