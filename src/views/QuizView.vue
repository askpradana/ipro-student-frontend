<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStores } from '@/stores/userStores'
import { useRouter } from 'vue-router'
import QuizFormContainer from '@/components/QuizForms/QuizFormContainer.vue'
import ModalContainer from '@/components/modals/ModalContainer.vue'
import ModalExitQuiz from '@/components/modals/ModalExitQuiz.vue'
import TypeQuizData from '@/data/type-quiz.json'
import SubmitForm from '@/components/QuizForms/SubmitForm.vue'
import { getTypeQuizWithUnderscore } from '@/lib/getTypeQuiz'
import ModalAlert from '@/components/modals/ModalAlert.vue'
import ModalWarningViolation from '@/components/modals/ModalWarningViolation.vue'

const store = useQuizStore()
const router = useRouter()
const modalStore = useModalStore()
const userStore = useUserStores()
const selectedAnswer = ref<string[] | number | string | null>(null)
const selectedQuiz = localStorage.getItem('type-quiz')

watch(
  () => store.currentQuestionIndex,
  () => {
    selectedAnswer.value = store.answers[store.currentQuestionIndex] ?? null
  },
)

const handleBack = () => {
  if (store.typeQuiz !== 0) {
    modalStore.typeOfModal('confirm-quit-quiz')
    modalStore.openModal()
  } else {
    router.push('/dashboard')
    localStorage.removeItem('type-quiz')
  }
}

const showIntructionTest = (imageSrc: string) => {
  modalStore.openModal()
  modalStore.typeOfModal('show-instruction')
  modalStore.imageSource = imageSrc
}

const startQuizHandler = (selectedTypeQuiz: number) => {
  const getTypeOfQuiz = getTypeQuizWithUnderscore(selectedTypeQuiz.toString())

  if (userStore[getTypeOfQuiz!]) {
    router.push('/completed')
  } else {
    store.startQuiz(selectedTypeQuiz)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Header -->
    <div class="mb-12 flex justify-between items-center">
      <h1
        class="text-xl md:text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        Learning Style Assessment
      </h1>
      <button
        @click="handleBack"
        class="p-2 hover:bg-white/80 border border-slate-200 hover:border-teal-500 rounded-lg transition-colors duration-300"
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

    <div class="max-w-4xl mx-auto md:mt-24">
      <!-- Guide Section -->
      <div v-if="!store.quizStarted" class="grid gap-4 md:mt-48">
        <template v-for="type in TypeQuizData" :key="type.id">
          <div
            v-if="type.typeQuiz === +selectedQuiz!"
            class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8"
          >
            <h2 class="text-center text-xl font-bold text-teal-600 mb-4">{{ type.title }}</h2>
            <p class="text-slate-600 mb-6 text-justify">
              {{ type.description }}
            </p>
            <button
              @click="showIntructionTest(type.instructionImage)"
              class="w-full mb-4 p-2 border border-teal-600 text-teal-600 rounded-xl font-semibold hover:bg-teal-100 active:scale-[0.98] transition-all duration-300"
            >
              Test Instructions
            </button>
            <button
              @click="startQuizHandler(type.typeQuiz)"
              class="w-full p-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300"
            >
              Start Assessment
            </button>
          </div>
        </template>
      </div>

      <div v-else class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-8">
        <div v-if="!store.isComplete">
          <QuizFormContainer />
        </div>

        <div v-else class="text-center py-8">
          <SubmitForm />
        </div>
      </div>

      <ModalContainer v-if="modalStore.typeModal === 'confirm-quit-quiz'">
        <ModalExitQuiz />
      </ModalContainer>

      <ModalContainer v-if="modalStore.typeModal == 'zoom-image'">
        <img :src="modalStore.imageSource" class="w-full" alt="zoom-image-quiz" />
      </ModalContainer>

      <ModalContainer v-if="modalStore.typeModal == 'show-instruction'">
        <img :src="modalStore.imageSource" class="w-full md:h-[700px]" alt="zoom-image-quiz" />
      </ModalContainer>

      <ModalContainer v-if="modalStore.typeModal == 'show-alert'">
        <ModalAlert title-modal="Alert" message="Please fill in all answers!" />
      </ModalContainer>

      <ModalContainer v-if="modalStore.typeModal == 'violation-warning'">
        <ModalWarningViolation />
      </ModalContainer>
    </div>
  </div>
</template>
