<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useRouter } from 'vue-router'

const store = useQuizStore()
const router = useRouter()
const selectedAnswer = ref<number | null>(null)

const options = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']

watch(
  () => store.currentQuestionIndex,
  () => {
    selectedAnswer.value = store.answers[store.currentQuestionIndex] ?? null
  },
)

const handleNext = () => {
  if (selectedAnswer.value !== null) {
    store.submitAnswer(selectedAnswer.value)
    store.nextQuestion()
  }
}

const handlePrevious = () => {
  store.previousQuestion()
}

const handleBack = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Header -->
    <div class="mb-12 flex justify-between items-center">
      <h1
        class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        Learning Style Assessment
      </h1>
      <button
        @click="handleBack"
        class="p-2 hover:bg-white/80 rounded-lg transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-slate-500 hover:stroke-teal-600"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Progress Bar -->
      <div class="w-full bg-slate-200 rounded-full h-2 mb-8">
        <div
          class="h-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 transition-all duration-300"
          :style="{ width: `${store.progress}%` }"
        ></div>
      </div>

      <!-- Guide Section -->
      <div
        v-if="!store.quizStarted"
        class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-8"
      >
        <h2 class="text-xl font-bold text-teal-600 mb-4">Welcome to Your Assessment</h2>
        <p class="text-slate-600 mb-6">
          This assessment will help identify your learning style preferences. Please answer each
          question honestly - there are no right or wrong answers.
        </p>
        <button
          @click="store.startQuiz"
          class="w-full p-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300"
        >
          Start Assessment
        </button>
      </div>

      <!-- Questions Section -->
      <div v-else class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-8">
        <div v-if="!store.isComplete">
          <h2 class="text-xl font-bold text-slate-800 mb-2">
            Question {{ store.currentQuestionIndex + 1 }} of {{ store.questions.length }}
          </h2>
          <p class="text-slate-600 mb-8">{{ store.currentQuestion?.question }}</p>

          <!-- Answer Options -->
          <div class="space-y-4">
            <label
              v-for="(option, index) in options"
              :key="index"
              class="flex items-center p-4 bg-white rounded-xl border border-slate-100 cursor-pointer hover:border-teal-100 hover:scale-[1.01] transition-all duration-300"
              :class="{ 'border-teal-200 bg-teal-50/50': selectedAnswer === index }"
            >
              <input
                type="radio"
                :name="'question'"
                :value="index"
                v-model="selectedAnswer"
                class="hidden"
              />
              <span
                class="w-5 h-5 border rounded-full flex items-center justify-center mr-3"
                :class="{ 'border-teal-600': selectedAnswer === index }"
              >
                <span
                  v-if="selectedAnswer === index"
                  class="w-3 h-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full"
                ></span>
              </span>
              <span class="text-slate-700">{{ option }}</span>
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

        <!-- Quiz Complete -->
        <div v-else class="text-center py-8">
          <h2 class="text-2xl font-bold text-slate-800 mb-4">Assessment Complete!</h2>
          <p class="text-slate-600 mb-8">
            Thank you for completing the assessment. Your results are being processed.
          </p>
          <div class="space-x-4">
            <button
              @click="router.push('/dashboard')"
              class="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
            >
              Back to Dashboard
            </button>
            <button
              @click="store.resetQuiz"
              class="px-6 py-3 rounded-lg font-semibold text-teal-600 hover:bg-teal-50 transition-all duration-300"
            >
              Take Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
