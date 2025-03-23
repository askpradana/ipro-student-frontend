<template>
  <div>
    <div class="flex flex-col-reverse md:flex-row justify-between items-center">
      <h2 class="text-xl font-bold text-slate-800">
        Pertanyaan {{ store.questions[store.currentQuestionIndex]?.soalID }} dari
        {{ store.questions.length }}
      </h2>
      <h2
        class="font-semibold text-lg"
        :class="timerStore.timer > 30 ? 'text-teal-600' : 'text-red-600'"
      >
        Waktu: {{ timerStore.formattedTime }}s
      </h2>
    </div>

    <p class="text-slate-800 my-8 mt-12">
      Telitilah apakah rangkaian angka atau huruf yang berada di depan dan di belakang garis pemisah
      itu sama ataukah berbeda.
    </p>

    <p class="text-black text-2xl my-8 text-center">
      {{ store.currentQuestion?.pilihan[0] }} - {{ store.currentQuestion?.pilihan[1] }}
    </p>

    <!-- Answer Options -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
      <label
        class="w-full flex items-center p-2 md:p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-teal-600 hover:scale-[1.01] transition-all duration-300"
        :class="{ 'border-teal-600 bg-teal-50/50': selectedAnswer === 1 }"
      >
        <input
          type="radio"
          :name="'question'"
          :value="1"
          v-model="selectedAnswer"
          @change="handleChangeAnswer"
          class="hidden"
        />
        <span
          class="w-5 h-5 border rounded-full flex items-center justify-center mr-3"
          :class="{ 'border-teal-600': selectedAnswer === 1 }"
        >
          <span
            v-if="selectedAnswer === 1"
            class="w-3 h-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"
          ></span>
        </span>
        <span class="text-slate-700">Sama</span>
      </label>

      <label
        class="w-full flex items-center p-2 md:p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-teal-600 hover:scale-[1.01] transition-all duration-300"
        :class="{ 'border-teal-600 bg-teal-50/50': selectedAnswer === 0 }"
      >
        <input
          type="radio"
          :name="'question'"
          :value="0"
          v-model="selectedAnswer"
          @change="handleChangeAnswer"
          class="hidden"
        />
        <span
          class="w-5 h-5 border rounded-full flex items-center justify-center mr-3"
          :class="{ 'border-teal-600': selectedAnswer === 0 }"
        >
          <span
            v-if="selectedAnswer === 0"
            class="w-3 h-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"
          ></span>
        </span>
        <span class="text-slate-700">Tidak Sama</span>
      </label>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-end mt-8">
      <button
        @click="handleNext"
        :disabled="selectedAnswer === null"
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {{ store.currentQuestionIndex === store.questions.length - 1 ? 'Selesai' : 'Berikutnya' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStores } from '@/stores/userStores'
import { useQuizSecurity } from '@/lib/useQuizSecurity'
import { useTimerStore } from '@/stores/timerStore'

const store = useQuizStore()
const modalStore = useModalStore()
const userStore = useUserStores()
const timerStore = useTimerStore()
const selectedAnswer = ref<string[] | number | string | null>(null)

const { addWatermark } = useQuizSecurity({
  preventRightClick: true,
  preventKeyboardShortcuts: true,
  enforceFullscreen: true, // Set true untuk paksa fullscreen
  detectTabChange: true,
  detectMouseLeave: true,
  addWatermark: true,
  // Callback untuk menampilkan peringatan modal
  warningCallback: (violationType) => {
    modalStore.message = violationType
    modalStore.openModal()
    modalStore.typeModal = 'violation-warning'
  },
})

// Initialize security features when component mounts
onMounted(() => {
  timerStore.startTimer()

  // Tambahkan watermark dengan ID peserta (bisa dari auth store)
  const userEmail = userStore.dataUser?.email
  addWatermark(userEmail as string)
})

watch(
  () => store.currentQuestionIndex,
  () => {
    selectedAnswer.value = store.answers[store.currentQuestionIndex] ?? null
  },
)

const handleChangeAnswer = () => {
  if (selectedAnswer.value !== null) {
    store.submitAnswer(selectedAnswer.value)
  }
}

const handleNext = () => {
  if (selectedAnswer.value !== null) {
    if (
      store.currentQuestionIndex === store.questions.length - 1 &&
      !store.answers.every((answer) => answer !== null)
    ) {
      modalStore.openModal()
      modalStore.typeModal = 'show-alert'
      return
    }

    store.nextQuestion()
  }
}
</script>

<style scoped></style>
