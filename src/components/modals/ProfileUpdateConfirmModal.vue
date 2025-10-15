<template>
  <div class="py-6 px-8 min-w-[320px] max-w-[480px] rounded-xl bg-white border border-slate-200 shadow-md">
    <div class="flex justify-start items-center">
      <div class="p-3 rounded-full mr-4 bg-amber-100 border-2 border-amber-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-amber-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-slate-800">Konfirmasi Data Profil</h2>
    </div>

    <div class="my-4 text-slate-600">
      <p class="mb-3">Apakah Anda yakin akan memasukkan data profil ini?</p>
      <div class="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
        <div><span class="font-medium">Nama:</span> {{ profileData.name }}</div>
        <div><span class="font-medium">Kelas:</span> {{ profileData.grade }}</div>
        <div><span class="font-medium">Sekolah:</span> {{ profileData.school }}</div>
        <div><span class="font-medium">Jurusan:</span> {{ profileData.jurusan }}</div>
      </div>
      <p class="mt-3 text-sm text-amber-700 font-medium">
        ⚠️ Data hanya akan bisa diubah oleh admin setelah disimpan.
      </p>
    </div>

    <div class="mt-6 flex w-full justify-end gap-3">
      <button
        @click="$emit('cancel')"
        class="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-300 font-medium"
      >
        Batal
      </button>
      <button
        @click="$emit('confirm')"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-lg hover:shadow-teal-500/25 transition-all duration-300 font-medium"
      >
        Ya, Simpan Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ProfileData {
  name: string
  grade: string
  school: string
  jurusan: string
}

defineProps<{
  profileData: ProfileData
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>