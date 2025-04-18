<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
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
        Halaman ini menjelaskan syarat dan ketentuan penggunaan layanan iPRO Student yang kami
        sediakan. Silakan baca dengan seksama sebelum melanjutkan.
      </p>

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
      <p>Jika ada masalah, harap hubungi pihak pengelola melalui kontak yang tersedia.</p>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getDisclaimerAgreement } from '@/api/getDisclaimerAgreement'
import { notify } from '@/lib/notify'

const router = useRouter()
const authStore = useAuthStore()
const isCheck = ref(false)
const isLoading = ref(false)
const isAlert = ref('')
const logoutErrorMessage = ref('')

const handleLogout = async () => {
  isLoading.value = true
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error: any) {
    console.error('Logout failed:', error)
    // Show the error modal with the message from the API
    logoutErrorMessage.value =
      error.response?.data?.message || 'Failed to logout. Please try again.'
    alert(error.response?.data?.message || 'Failed to logout. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const dislaimerAgreementPost = () => {
  if (isCheck.value) {
    isLoading.value = true
    getDisclaimerAgreement()
      .then((res) => {
        notify(res?.message as string, 'success')
        setTimeout(() => {
          router.push('/dashboard')
        }, 1500)
      })
      .catch((err) => {
        notify(err as string, 'success')
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
