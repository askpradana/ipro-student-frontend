<template>
  <div class="py-6 px-8 min-w-[360px] rounded-xl bg-white border border-slate-200 shadow-md">
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
      <h2 class="text-xl font-bold text-slate-800">Konfirmasi Reset Quiz</h2>
    </div>
    <p class="my-4 text-slate-600">
      Apakah Anda yakin ingin mereset progress quiz untuk <strong>{{ userName }}</strong>?
      <br>
      <span class="text-red-600 text-sm mt-2 block">
        Semua data quiz akan dihapus dan tidak dapat dikembalikan.
      </span>
    </p>
    <div class="mt-8 flex w-full justify-end gap-3">
      <button
        @click="$emit('cancel')"
        class="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors duration-300 font-medium"
      >
        Batal
      </button>
      <button
        @click="$emit('confirm')"
        class="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-medium"
      >
        Reset Quiz
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  userName: string
}>()

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>