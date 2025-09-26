<template>
  <button
    @click="onLogoutClick"
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
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const { handleLogout } = defineProps<{
  handleLogout: () => void
}>()

const onLogoutClick = () => {
  console.log('LogoutUserButton clicked')
  console.log('handleLogout function:', handleLogout)
  handleLogout()
}
</script>

<style scoped></style>
