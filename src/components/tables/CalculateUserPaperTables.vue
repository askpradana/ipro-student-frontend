<template>
  <div class="bg-white border border-slate-100 rounded-lg shadow-lg p-4">
    <div class="bg-gradient-to-r from-teal-600 to-emerald-700-500 text-white rounded-t-lg p-4">
      <h1 class="text-2xl font-bold">Psikogram Murid</h1>
      <p class="text-sm">Profil Penilaian Kognitif & Pribadi</p>
    </div>
    <div class="bg-white p-4 rounded-b-lg">
      <div
        class="text-center text-slate-700 text-sm mb-8 mt-4 flex justify-center items-center gap-2"
      >
        <span>1 - Perlu Penguatan 🥺</span>
        <span>2 - Perlu Perhatian 😐</span>
        <span>3 - Cukup Berkembang 🙂</span>
        <span>4 - Unggul 😊</span>
        <span>5 - Sangat Unggul 🌟</span>
      </div>

      <!-- <CalclulateUserTables :user-data="userData" /> -->

      <!-- Cognitive Abilities Section -->
      <h2 class="text-lg font-bold mb-2">Kemampuan Berpikir</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-teal-50 p-4 rounded-lg shadow">
          <span class="flex justify-between items-center">
            <h3 class="font-bold text-teal-600">Kecerdasan Umum</h3>
            <div class="flex justify-end items-center gap-1">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.kecerdasan_umum.skor!">
                  <p>{{ getEmojiForSkor(userData?.kecerdasan_umum.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.penalaran_numerik.skor!">
                  <p>{{ getEmojiForSkor(userData?.penalaran_numerik.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.penalaran_verbal.skor!">
                  <p>{{ getEmojiForSkor(userData?.penalaran_verbal.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.penalaran_non_verbal.skor!">
                  <p>{{ getEmojiForSkor(userData?.penalaran_non_verbal.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.kecepatan_perseptual.skor!">
                  <p>{{ getEmojiForSkor(userData?.kecepatan_perseptual.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.ketelitian_kerja.skor!">
                  <p>{{ getEmojiForSkor(userData?.ketelitian_kerja.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
      <h2 class="text-lg font-bold mb-2">Kualitas Pribadi</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-teal-50 p-4 rounded-lg shadow">
          <span class="flex justify-between items-center">
            <h3 class="font-bold text-teal-600">Sistematik Kerja</h3>
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.sistematik_kerja.skor!">
                  <p>{{ getEmojiForSkor(userData?.sistematik_kerja.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.ketangguhan.skor!">
                  <p>{{ getEmojiForSkor(userData?.ketangguhan.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.penyesuaian_diri.skor!">
                  <p>{{ getEmojiForSkor(userData?.penyesuaian_diri.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.hubungan_interpersonal.skor!">
                  <p>{{ getEmojiForSkor(userData?.hubungan_interpersonal.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.motivasi_berprestasi.skor!">
                  <p>{{ getEmojiForSkor(userData?.motivasi_berprestasi.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
            <div class="flex justify-end gap-1 items-center">
              <div v-for="star in 5" :key="star">
                <span v-if="star <= userData?.kemandirian.skor!">
                  <p>{{ getEmojiForSkor(userData?.kemandirian.skor as number) }}</p>
                </span>
                <div v-else class="h-4 w-4 rounded-full bg-slate-300"></div>
              </div>
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
        Psikogram ini dimaksudkan sebagai alat panduan dan harus dipertimbangkan bersama lainnya
        penilaian dan pengamatan.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserAssessment } from '@/types/calculateTypes'
import { getEmojiForSkor } from '@/lib/getEmojiSkor'

const { userData } = defineProps<{
  userData: UserAssessment | undefined
}>()
</script>
