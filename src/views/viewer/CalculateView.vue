<template>
  <CalculateSkeleton v-if="loading" />
  <div v-else class="mx-auto p-4 bg-slate-200">
    <router-link
      to="/viewer/dashboard"
      class="block my-4 bg-red-400 text-white px-4 py-2 rounded-lg transition duration-150 hover:bg-red-500 size-fit"
      >Back to Dashboard</router-link
    >
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="bg-gradient-to-r from-teal-600 to-emerald-700-500 text-white rounded-t-lg p-4">
        <h1 class="text-2xl font-bold">Student Psychogram</h1>
        <p class="text-sm">Cognitive & Personal Assessment Profile</p>
      </div>
      <div class="bg-white p-4 rounded-b-lg">
        <div
          class="text-center text-slate-700 text-sm mb-8 mt-4 flex justify-center items-center gap-2"
        >
          <span>1 - Below Average</span>
          <span>2 - Somewhat Below Average</span>
          <span>3 - Average</span>
          <span>4 - Above Average</span>
          <span>5 - Excellent</span>
        </div>

        <!-- Cognitive Abilities Section -->
        <h2 class="text-lg font-bold mb-2">Cognitive Abilities</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Kecerdasan Umum</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.kecerdasan_umum?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.kecerdasan_umum.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.kecerdasan_umum.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Penalaran Numerik</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.penalaran_numerik?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.penalaran_numerik.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.penalaran_numerik.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Penalaran Verbal</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.penalaran_verbal?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.penalaran_verbal.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.penalaran_verbal.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Penalaran Non Verbal</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.penalaran_non_verbal?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.penalaran_non_verbal.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.penalaran_non_verbal.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Kecepatan Perseptual</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.kecepatan_perseptual?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.kecepatan_perseptual.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.kecepatan_perseptual.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Ketelitian Kerja</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.ketelitian_kerja?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.ketelitian_kerja.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.ketelitian_kerja.deskripsi }}
            </p>
          </div>
        </div>

        <!-- Personal Qualities Section -->
        <h2 class="text-lg font-bold mb-2">Personal Qualities</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Sistematik Kerja</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.sistematik_kerja?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.sistematik_kerja.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.sistematik_kerja.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Ketangguhan</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.ketangguhan?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.ketangguhan.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.ketangguhan.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Penyesuaian Diri</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.penyesuaian_diri?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.penyesuaian_diri.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.penyesuaian_diri.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Hubungan Interpersonal</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.hubungan_interpersonal?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.hubungan_interpersonal.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.hubungan_interpersonal.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Motivasi Berprestasi</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.motivasi_berprestasi?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.motivasi_berprestasi.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.motivasi_berprestasi.deskripsi }}
            </p>
          </div>

          <div class="bg-teal-50 p-4 rounded-lg shadow">
            <span class="flex justify-between items-center">
              <h3 class="font-bold text-teal-600">Kemandirian</h3>
              <div class="flex justify-end gap-1">
                <div
                  v-for="star in 5"
                  :key="star"
                  class="h-2 w-2 bg-slate-200 rounded-full"
                  :class="{ 'bg-teal-600': star <= userData?.kemandirian?.skor! }"
                ></div>
              </div>
            </span>
            <p class="text-sm mt-2">
              {{ userData?.kemandirian.definisi_aspek }}
            </p>
            <p class="text-sm font-semibold my-2 text-slate-700">Penilaian:</p>
            <p class="text-sm">
              {{ userData?.kemandirian.deskripsi }}
            </p>
          </div>
        </div>

        <p class="text-xs text-gray-500 text-center">
          This psychogram is intended as a guidance tool and should be considered alongside other
          assessments and observations.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CalculateApiResponse } from '@/types/calculateTypes'
import { postCalculateUser } from '@/api/postCalculateUser'
import { useRoute } from 'vue-router'
import CalculateSkeleton from '@/components/skeletons/CalculateSkeleton.vue'

const router = useRoute()
const { userId } = router.params
const dataCalculateUser = ref<CalculateApiResponse | undefined>()
const userData = computed(() => dataCalculateUser.value?.data[userId as string])
const loading = ref(false)

onMounted(() => {
  loading.value = true
  const listID: string[] = []
  listID.push(userId as string)

  postCalculateUser(listID).then((res) => {
    dataCalculateUser.value = res
    loading.value = false
  })
})
</script>
