<template>
  <div>
    <h2 class="text-xl font-bold text-slate-800 mb-2">
      Question {{ store.questions[store.currentQuestionIndex]?.soalID }} of
      {{ store.questions.length }}
    </h2>
    <div class="flex items-center flex-wrap gap-2 cursor-pointer mt-4">
      <span
        v-for="(question, index) of store.questions"
        :key="question.soalID"
        :class="
          store.currentQuestionIndex === index
            ? 'bg-teal-600 text-white'
            : '' || store.answers[index] !== null
              ? 'bg-teal-400 text-white'
              : ''
        "
        class="text-xs text-center rounded-sm w-6 py-1 border border-teal-600 hover:bg-teal-200"
        @click="store.currentQuestionIndex = index"
      >
        {{ question.soalID }}
      </span>
    </div>

    <p class="text-black my-8">
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
    <div class="flex justify-between mt-8">
      <button
        @click="handlePrevious"
        :disabled="store.currentQuestionIndex === 0"
        class="px-6 py-2 rounded-lg font-semibold text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        Previous
      </button>
      <button
        @click="handleNext"
        :disabled="selectedAnswer === null"
        class="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        {{ store.currentQuestionIndex === store.questions.length - 1 ? 'Complete' : 'Next' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useModalStore } from '@/stores/modalStore'

const store = useQuizStore()
const modalStore = useModalStore()

const selectedAnswer = ref<string[] | number | string | null>(null)

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

const handlePrevious = () => {
  store.previousQuestion()
}
</script>

<style scoped></style>
