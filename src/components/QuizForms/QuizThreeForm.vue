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

    <p class="text-slate-600 my-8 text-justify">
      Dari 4 pilihan kata yang ada, carilah kata - kata yang memiliki kemiripan makna atau yang
      bertentangan.
    </p>

    <!-- Answer Options -->
    <div class="grid md:grid-cols-2 gap-4">
      <label
        v-for="(option, index) in store.questions[store.currentQuestionIndex]?.pilihan"
        :key="index"
        class="flex items-center p-2 md:p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-teal-600 hover:scale-[1.01] transition-all duration-300"
        :class="{ 'border-teal-600 bg-teal-50/50 ': selectedAnswers.includes(option) }"
      >
        <div class="relative">
          <input
            type="checkbox"
            :value="option"
            :disabled="isDisabled(option)"
            v-model="selectedAnswers"
            @change="handleAnswerChange"
            class="custom-checkbox opacity-0 absolute h-5 w-5 cursor-pointer"
          />
          <div
            class="checkbox-display w-5 h-5 border-2 rounded border-slate-300 flex items-center justify-center transition-colors duration-200"
            :class="{ 'bg-teal-600 border-teal-600': selectedAnswers.includes(option) }"
          >
            <svg
              v-show="selectedAnswers.includes(option)"
              class="w-3 h-3 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              />
            </svg>
          </div>
        </div>
        <span class="ml-3 text-slate-700">{{ option }}</span>
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
        :disabled="selectedAnswers.length === 0"
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
const selectedAnswers = ref<string[]>([])

watch(
  () => store.currentQuestionIndex,
  () => {
    selectedAnswers.value = Array.isArray(store.answers[store.currentQuestionIndex])
      ? (store.answers[store.currentQuestionIndex] as string[])
      : []
  },
)

const isDisabled = (option: string): boolean => {
  return !selectedAnswers.value.includes(option) && selectedAnswers.value.length >= 2
}

const handleAnswerChange = () => {
  store.submitAnswer(selectedAnswers.value)
}

const handleNext = () => {
  if (selectedAnswers.value !== null) {
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

<style scoped>
.custom-checkbox:checked + .checkbox-display {
  @apply bg-teal-600 border-teal-600;
}

.custom-checkbox:focus + .checkbox-display {
  @apply ring-1 ring-offset-2 ring-teal-500;
}

.custom-checkbox:hover + .checkbox-display {
  @apply border-teal-500;
}
</style>
