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
            : store.answers[index] !== null
              ? 'bg-teal-400 text-white'
              : ''
        "
        class="text-xs text-center w-6 py-1 rounded-sm border border-teal-600 hover:bg-teal-200"
        @click="store.currentQuestionIndex = index"
      >
        {{ question.soalID }}
      </span>
    </div>

    <p class="text-slate-800 mb-8 mt-4 text-justify text-xs md:text-base">
      Dari 4 gambar di samping kanan, pilihlah mana yang merupakan hasil lipatan dari gambar sebelah
      kiri!
    </p>

    <img
      :src="DataImage[store.questions[store.currentQuestionIndex]?.soalID - 1]?.iamgeSrc"
      @click="
        zoomImage(DataImage[store.questions[store.currentQuestionIndex]?.soalID - 1]?.iamgeSrc)
      "
      alt="gambar-soal"
      class="mb-8"
    />

    <!-- Answer Options -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <label
        v-for="(option, index) in store.questions[store.currentQuestionIndex]?.pilihan"
        :key="index"
        class="flex items-center p-2 md:p-4 bg-white rounded-xl border border-slate-200 cursor-pointer hover:border-teal-600 hover:scale-[1.01] transition-all duration-300"
        :class="{ 'border-teal-600 bg-teal-50/50': selectedAnswer === index }"
      >
        <input
          type="radio"
          :name="'question'"
          :value="index"
          v-model="selectedIndex"
          @change="handleOptionSelect(option)"
          class="hidden"
        />
        <span
          class="w-5 h-5 border rounded-full flex items-center justify-center mr-3"
          :class="{ 'border-teal-600': selectedIndex === index }"
        >
          <span
            v-if="selectedIndex === index"
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
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStores } from '@/stores/userStores'
import { useQuizSecurity } from '@/lib/useQuizSecurity'
import DataImage from '@/data/gambar-soal.json'

const store = useQuizStore()
const modalStore = useModalStore()
const selectedAnswer = ref<string[] | number | string | null>(null)
const selectedIndex = ref<number | null>(null)
const userStore = useUserStores()

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
  // Tambahkan watermark dengan ID peserta (bisa dari auth store)
  const userEmail = userStore.dataUser?.email
  addWatermark(userEmail as string)
})

watch(
  () => store.currentQuestionIndex,
  () => {
    const currentAnswer = store.answers[store.currentQuestionIndex]
    selectedAnswer.value = currentAnswer ?? null

    // Find index of the current answer in pilihan array
    if (currentAnswer) {
      const currentOptions = store.questions[store.currentQuestionIndex]?.pilihan
      selectedIndex.value = currentOptions?.findIndex((option) => option === currentAnswer) ?? null
    } else {
      selectedIndex.value = null
    }
  },
)

const zoomImage = (imageSrc: string) => {
  modalStore.typeOfModal('zoom-image')
  modalStore.setSourceImage(imageSrc)
  modalStore.openModal()
}

const handleOptionSelect = (option: string) => {
  selectedAnswer.value = option
  store.submitAnswer(selectedAnswer.value)
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
