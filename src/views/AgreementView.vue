<template>
  <div v-if="isLoading && !showAgreementForm" class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
      <p class="text-slate-600">Memeriksa status persetujuan...</p>
    </div>
  </div>
  <div v-else-if="showAgreementForm" class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Logo area -->
    <div class="mb-12 animate-fade-in flex justify-between items-center">
      <img
        src="/assets/iradat-konsultan.png"
        height="80"
        width="80"
        alt="company-profile"
        class="select-none"
      />
      <button
        @click="handleLogout"
        class="text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        :class="isLoading ? 'bg-slate-400 text-black' : 'bg-red-600'"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Keluar...' : 'Keluar' }}
      </button>
    </div>

    <h1
      class="my-10 font-semibold md:font-bold text-2xl md:text-3xl text-center text-teal-600 uppercase"
    >
      HALAMAN PERSETUJUAN
    </h1>
    <article class="max-w-2xl mx-auto text-justify">
      <p class="mb-6">
        Sebelum memulai Tes Online ini, pastikan Anda memahami dan menyiapkan hal-hal berikut:
      </p>

      <h2 class="text-lg font-semibold mt-4 mb-2">Persiapan Perangkat</h2>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li class="mb-2">Gunakan laptop/PC dengan OS: Windows/MacOS.</li>
        <li class="mb-2">
          Browser yang direkomendasikan: Chrome (Windows/MacOS), Edge (Windows), atau Safari
          (MacOS).
        </li>
      </ul>

      <h2 class="text-lg font-semibold mt-4 mb-2">Ketentuan Tes</h2>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li class="mb-2">
          Pastikan tidak membuka aplikasi atau browser lain selama tes untuk menjaga fokus.
        </li>
        <li class="mb-2">
          Tes terdiri dari 5 sub-tes. Selesaikan dengan tenang dan serius karena masing-masing
          memiliki batas waktu tertentu.
        </li>
        <li class="mb-2">Baca setiap instruksi sub-tes dengan saksama sebelum memulai.</li>
        <li class="mb-2">
          Jawaban Anda akan tersimpan otomatis dan Anda berpindah ke soal berikutnya.
        </li>
        <li class="mb-2">
          Jika diperlukan, Anda dapat mengoreksi jawaban dengan mengklik nomor soal yang ingin
          diperbaiki.
        </li>
        <li class="mb-2">
          Tes ini dilengkapi dengan sistem pengawasan yang ketat. Pastikan mematuhi aturan yang
          ditetapkan untuk menghindari konsekuensi negatif.
        </li>
        <li class="mb-2">
          Jika mengalami kendala teknis, silakan anda membaca FAQ (Frequently Asked Questions) atau
          bisa hubungi kami di nomor
          <a
            href="https://wa.me/6285713475074"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
          >
            085713475074
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
              />
            </svg> </a
          >.
        </li>
      </ul>

      <h2 class="text-lg font-semibold mt-4 mb-2">Penggunaan Layanan</h2>
      <p>Dengan menggunakan platform ini, Anda setuju untuk:</p>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li class="mb-2">Menggunakan platform Tes hanya untuk tujuan pendidikan.</li>
        <li class="mb-2">Menjaga etika dan tidak melakukan kecurangan.</li>
      </ul>

      <h2 class="text-lg font-semibold mt-4 mb-2">Kewajiban Siswa</h2>
      <p>Anda diwajibkan untuk:</p>
      <ul class="list-disc list-inside mb-4 ml-4">
        <li class="mb-2">Mengisi data pribadi dengan benar.</li>
        <li class="mb-2">Menghormati waktu dan tata tertib yang telah ditentukan.</li>
      </ul>

      <h2 class="text-lg font-semibold mt-4 mb-2">Privasi dan Perlindungan Data</h2>
      <p>
        Data pribadi Anda akan dikelola dengan aman dan tidak akan dibagikan kepada pihak ketiga
        tanpa izin.
      </p>

      <h2 class="text-lg font-semibold mt-4 mb-2">Pelanggaran dan Sanksi</h2>
      <p>
        Pelanggaran terhadap syarat dan ketentuan ini dapat mengakibatkan dilarangnya akses ke
        platform atau tindakan disipliner oleh pihak sekolah.
      </p>
      <h2 class="text-lg font-semibold mt-4 mb-2">Perubahan terhadap Persetujuan</h2>
      <p>
        Menyatakan bahwa syarat dan ketentuan dapat diubah, dan pengguna akan diberitahu tentang
        perubahan tersebut.
      </p>

      <h2 class="text-lg font-semibold mt-4 mb-2">Penyelesaian Masalah</h2>
      <p>
        Jika ada masalah, harap hubungi pihak pengelola melalui kontak yang tersedia di nomor
        <a
          href="https://wa.me/6285713475074"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
        >
          085713475074
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg> </a
        >.
      </p>

      <form class="mt-8 flex justify-start items-start sm:items-center">
        <input
          type="checkbox"
          class="size-5 accent-emerald-400 text-white cursor-pointer"
          name="agreement"
          id="agreement"
          v-model="isCheck"
        />
        <label class="ml-2" for="agreement"
          >Dengan ini saya menyetujui semua ketentuan di atas.</label
        >
      </form>

      <button
        class="w-full my-8 px-8 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
        :class="isCheck ? '' : 'hidden'"
        :disabled="isLoading"
        @click="dislaimerAgreementPost"
      >
        {{ isLoading ? 'Menunggu...' : 'Setuju' }}
      </button>
      <p
        :class="isAlert ? 'block' : 'hidden'"
        class="text-center my-8 bg-red-400 px-4 py-2 text-white rounded-md"
      >
        {{ isAlert }}
      </p>
    </article>

    <!-- Logout Confirmation Modal -->
    <div
      v-if="showLogoutConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <LogoutConfirmModal
        @confirm="confirmLogout"
        @cancel="cancelLogout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStores } from '@/stores/userStores'
import { checkDisclaimerStatus, setDisclaimerAgreement } from '@/api/getDisclaimerAgreement'
import { notify } from '@/lib/notify'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import LogoutConfirmModal from '@/components/modals/LogoutConfirmModal.vue'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStores()
const isCheck = ref(false)
const isLoading = ref(false)
const isAlert = ref('')
const logoutErrorMessage = ref('')
const showAgreementForm = ref(false)
const showLogoutConfirmModal = ref(false)

const handleLogout = () => {
  showLogoutConfirmModal.value = true
}

const confirmLogout = async () => {
  showLogoutConfirmModal.value = false
  isLoading.value = true
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error: unknown) {
    console.error('Logout failed:', error)
    // Show the error modal with the message from the API
    logoutErrorMessage.value =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to logout. Please try again.'
    alert((error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to logout. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const cancelLogout = () => {
  showLogoutConfirmModal.value = false
}

onMounted(() => {
  // Show agreement form immediately since user was redirected here
  // DashboardView already checked disclaimer status before redirecting
  showAgreementForm.value = true
  isLoading.value = false
})

const dislaimerAgreementPost = () => {
  if (isCheck.value) {
    isLoading.value = true
    setDisclaimerAgreement()
      .then((res) => {
        notify(res?.message as string, 'success')
        // Update local state immediately after successful API call
        userStore.updateDisclaimerAgreement(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      })
      .catch((err) => {
        notify(err as string, 'error')
        console.error(err)
        isAlert.value = err
      })
      .finally(() => {
        setTimeout(() => {
          isLoading.value = false
        }, 1900)
      })
  } else {
    isAlert.value = 'Tolong centang persetujuan terlebih dahulu.'
  }
}
</script>

<style scoped>
.text-indent {
  text-indent: -1.2rem;
}
</style>
