<template class="bg-slate-200">
  <div class="max-w-7xl mx-auto w-full">
    <CalculateSkeleton v-if="loading" />
    <div v-else class="p-4">
      <div class="flex justify-between items-center">
        <router-link
          to="/viewer/dashboard"
          class="block text-sm my-4 bg-red-400 text-white px-4 py-2 rounded-lg transition duration-150 hover:bg-red-500 size-fit"
          >Kembali ke Dashboard</router-link
        >
        <div
          class="relative flex h-10 w-64 cursor-pointer rounded-md border border-gray-200 bg-gray-100 p-1 overflow-hidden"
          @click="toggle"
        >
          <!-- Sliding background -->
          <div
            class="absolute top-1 bottom-1 w-[calc(50%-4px)] transition-transform duration-500 ease-out rounded-md bg-white shadow-sm"
            :style="{
              transform: viewMode === 'report' ? 'translateX(0)' : 'translateX(100%)',
            }"
          ></div>

          <!-- Report option -->
          <div
            class="relative z-10 flex-1 flex items-center justify-center transition-all duration-500 ease-out"
            :class="
              viewMode === 'report'
                ? 'text-white font-medium bg-teal-600 rounded-md '
                : 'text-gray-500'
            "
          >
            <span
              class="transition-transform"
              :class="viewMode === 'report' ? 'transform-none' : ' opacity-70'"
            >
              Laporan
            </span>
          </div>

          <!-- Table option -->
          <div
            class="relative z-10 flex-1 flex items-center justify-center transition-all duration-500 ease-out"
            :class="
              viewMode === 'table'
                ? 'text-white font-medium bg-teal-600 rounded-md'
                : 'text-gray-500 '
            "
          >
            <span
              class="transition-transform"
              :class="viewMode === 'table' ? 'transform-none' : ' opacity-70'"
            >
              Tabel
            </span>
          </div>
        </div>
      </div>
      <CalclulateUserTables :user-data="userData" v-if="viewMode === 'table'" />
      <CalculateUserPaperTables :user-data="userData" v-else-if="viewMode === 'report'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CalculateApiResponse } from '@/types/calculateTypes'
import { postCalculateUser } from '@/api/postCalculateUser'
import { useRoute } from 'vue-router'
import CalculateSkeleton from '@/components/skeletons/CalculateSkeleton.vue'
import CalculateUserPaperTables from '@/components/tables/CalculateUserPaperTables.vue'
import CalclulateUserTables from '@/components/tables/CalclulateUserTables.vue'

const router = useRoute()
const { userId } = router.params
const dataCalculateUser = ref<CalculateApiResponse | undefined>()
const userData = computed(() => dataCalculateUser.value?.data[userId as string])
const loading = ref(false)
const viewMode = ref('report')

onMounted(() => {
  loading.value = true
  const listID: string[] = []
  listID.push(userId as string)

  postCalculateUser(listID).then((res) => {
    dataCalculateUser.value = res
    loading.value = false
    console.log('API calculate:', res)
  })
})

const toggle = () => {
  viewMode.value = viewMode.value === 'report' ? 'table' : 'report'
}
</script>
