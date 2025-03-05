<template>
  <div class="bg-white border border-slate-100 rounded-lg shadow-lg p-4">
    <div class="overflow-x-auto">
      <div class="bg-gradient-to-r from-teal-600 to-emerald-700-500 text-white rounded-t-lg p-4">
        <h1 class="text-2xl font-bold">Student Psychogram Table</h1>
        <p class="text-sm">Cognitive & Personal Assessment Profile</p>
      </div>
      <div class="text-center text-slate-700 text-sm my-8 flex justify-center items-center gap-2">
        <span>1 - Below Average 🥺</span>
        <span>2 - Somewhat Below Average 😐</span>
        <span>3 - Average 🙂</span>
        <span>4 - Above Average 😊</span>
        <span>5 - Excellent 🌟</span>
      </div>
      <table class="min-w-full border-collapse border border-gray-400 rounded-xl mb-4">
        <thead>
          <tr>
            <th class="border border-gray-400 p-2 bg-teal-600 text-white" colspan="7">
              Student Psychogram Table
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-400 p-2 font-bold text-center" colspan="2">
              Kemampuan Berpikir
            </td>
            <td
              class="border border-gray-400 p-2 text-center font-semibold"
              v-for="number in 5"
              :key="number"
            >
              {{ number }}
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">1</td>
            <td class="border border-gray-400 p-2">Kecerdasan Umum</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.kecerdasan_umum.skor!
                    ? getEmojiForSkor(userData?.kecerdasan_umum.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">2</td>
            <td class="border border-gray-400 p-2">Penalaran Numerik</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.penalaran_numerik.skor!
                    ? getEmojiForSkor(userData?.penalaran_numerik.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">3</td>
            <td class="border border-gray-400 p-2">Penalaran Verbal</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.penalaran_verbal.skor!
                    ? getEmojiForSkor(userData?.penalaran_verbal.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">4</td>
            <td class="border border-gray-400 p-2">Penalaran Non Verbal</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.penalaran_non_verbal.skor!
                    ? getEmojiForSkor(userData?.penalaran_non_verbal.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">5</td>
            <td class="border border-gray-400 p-2">Kecepatan Perseptual</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.kecepatan_perseptual.skor!
                    ? getEmojiForSkor(userData?.kecepatan_perseptual.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 font-bold text-center" colspan="2">
              Sikap Kerja
            </td>
            <td
              class="border border-gray-400 p-2 text-center font-semibold"
              v-for="number in 5"
              :key="number"
            >
              {{ number }}
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">1</td>
            <td class="border border-gray-400 p-2">Ketelitian</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.ketelitian_kerja.skor!
                    ? getEmojiForSkor(userData?.ketelitian_kerja.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">2</td>
            <td class="border border-gray-400 p-2">Sistematika Kerja</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.sistematik_kerja.skor!
                    ? getEmojiForSkor(userData?.sistematik_kerja.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">3</td>
            <td class="border border-gray-400 p-2">Ketangguhan</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.ketangguhan.skor!
                    ? getEmojiForSkor(userData?.ketangguhan.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 font-bold text-center" colspan="2">
              Kepribadian
            </td>
            <td
              class="border border-gray-400 p-2 text-center font-semibold"
              v-for="number in 5"
              :key="number"
            >
              {{ number }}
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">1</td>
            <td class="border border-gray-400 p-2">Penyesuaian Diri</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.penyesuaian_diri.skor!
                    ? getEmojiForSkor(userData?.penyesuaian_diri.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">2</td>
            <td class="border border-gray-400 p-2">Hubungan Interpersonal</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.hubungan_interpersonal.skor!
                    ? getEmojiForSkor(userData?.hubungan_interpersonal.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">3</td>
            <td class="border border-gray-400 p-2">Motivasi Berprestasi</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.motivasi_berprestasi.skor!
                    ? getEmojiForSkor(userData?.motivasi_berprestasi.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
          <tr>
            <td class="border border-gray-400 p-2 text-center">4</td>
            <td class="border border-gray-400 p-2">Kemandirian</td>
            <td
              class="border border-gray-400 p-2 text-center"
              v-for="(skor, index) in 5"
              :key="index"
            >
              <p class="text-xl">
                {{
                  index < userData?.kemandirian.skor!
                    ? getEmojiForSkor(userData?.kemandirian.skor as number)
                    : ''
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="text-xs text-gray-500 text-center mb-4 mt-6">
        This psychogram is intended as a guidance tool and should be considered alongside other
        assessments and observations.
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
