<template>
  <main>
    <RouterView />
  </main>
  <ToastifyContainer />
  <AuthFlowStatus />
</template>

<script setup lang="ts">
import { ToastifyContainer } from 'vue3-toastify'
import AuthFlowStatus from '@/components/auth/AuthFlowStatus.vue'
</script>
