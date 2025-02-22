<template>
  <button
    @click="handleHelp"
    class="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 hover:bg-white hover:scale-110 hover:border-teal-500 active:scale-90 transition-all duration-300 ease-out flex items-center justify-center group"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      class="w-6 h-6 stroke-slate-500 group-hover:stroke-teal-600 transition-colors duration-300"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const { handleHelp } = defineProps<{
  handleHelp: () => void
}>()
</script>

<style scoped></style>
