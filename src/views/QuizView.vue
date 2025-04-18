<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import { useModalStore } from '@/stores/modalStore'
import { useUserStores } from '@/stores/userStores'
import { useTimerStore } from '@/stores/timerStore'
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
const timerStore = useTimerStore()
const selectedAnswer = ref<string[] | number | string | null>(null)
const selectedQuiz = localStorage.getItem('type-quiz')

const exerciseQuiz1 = localStorage.getItem('exerciseQuiz1')
const exerciseQuiz2 = localStorage.getItem('exerciseQuiz2')
const exerciseQuiz3 = localStorage.getItem('exerciseQuiz3')
const exerciseQuiz4 = localStorage.getItem('exerciseQuiz4')
const exerciseQuiz5 = localStorage.getItem('exerciseQuiz5')

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
    localStorage.removeItem('isTraining')
  }
}

// const showIntructionTest = (imageSrc: string) => {
//   modalStore.openModal()
//   modalStore.typeOfModal('show-instruction')
//   modalStore.imageSource = imageSrc
// }

const formattedDescription = (description: string) => {
  return description.replace(/\n/g, '<br>')
}

const startQuizHandler = (selectedTypeQuiz: number, isTraining: boolean = false) => {
  const getTypeOfQuiz = getTypeQuizWithUnderscore(selectedTypeQuiz.toString())

  if (userStore[getTypeOfQuiz!]) {
    router.push('/completed')
  } else {
    const getTimer = () => {
      switch (getTypeOfQuiz) {
        case 'quiz_tiga':
          return 60 * 6
        case 'quiz_lima':
          return 60 * 10
        case 'quiz_enam':
          return 60 * 4
        case 'quiz_tujuh':
          return 60 * 6
        case 'quiz_ppi':
          return 60 * 15

        default:
          break
      }
    }

    const timer = getTimer()

    store.startQuiz(selectedTypeQuiz, isTraining)
    timerStore.resetTimer(timer)
    // timerStore.resetTimer(40)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Header -->
    <div class="mb-12 sm:mb-4 flex justify-between items-center">
      <img
        src="/assets/iradat-konsultan.png"
        height="80"
        width="80"
        alt="company-profile"
        class="select-none"
      />
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

    <div class="max-w-4xl mx-auto md:mt-8">
      <!-- Guide Section -->
      <div v-if="!store.quizStarted" class="grid gap-6">
        <template v-for="type in TypeQuizData" :key="type.id">
          <div
            v-if="type.typeQuiz === +selectedQuiz!"
            class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <!-- Quiz Title Section -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-teal-600 mb-2">{{ type.title }}</h2>
              <div
                class="w-20 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"
              ></div>
            </div>

            <!-- Description Section -->
            <div class="bg-slate-50/50 rounded-xl p-6 mb-8 border border-slate-100">
              <p
                class="text-slate-700 leading-relaxed text-justify"
                v-html="formattedDescription(type.description)"
              ></p>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-4">
              <button
                @click="startQuizHandler(type.typeQuiz, true)"
                class="w-full p-3 border-2 border-teal-600 text-teal-600 rounded-xl font-semibold hover:bg-teal-50 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Latihan Tes
              </button>
              <!-- Quiz 1 Button -->
              <button
                @click="startQuizHandler(type.typeQuiz)"
                class="w-full p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                :class="exerciseQuiz1 === '1' && selectedQuiz === '1' ? 'flex' : 'hidden'"
              >
                Mulai Tes
              </button>

              <!-- Quiz 2 Button -->
              <button
                @click="startQuizHandler(type.typeQuiz)"
                class="w-full p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                :class="exerciseQuiz2 === '2' && selectedQuiz === '2' ? 'flex' : 'hidden'"
              >
                Mulai Tes
              </button>

              <!-- Quiz 3 Button -->
              <button
                @click="startQuizHandler(type.typeQuiz)"
                class="w-full p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                :class="exerciseQuiz3 === '3' && selectedQuiz === '3' ? 'flex' : 'hidden'"
              >
                Mulai Tes
              </button>

              <!-- Quiz 4 Button -->
              <button
                @click="startQuizHandler(type.typeQuiz)"
                class="w-full p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                :class="exerciseQuiz4 === '4' && selectedQuiz === '4' ? 'flex' : 'hidden'"
              >
                Mulai Tes
              </button>

              <!-- Quiz 5 Button -->
              <button
                @click="startQuizHandler(type.typeQuiz)"
                class="w-full p-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                :class="exerciseQuiz5 === '5' && selectedQuiz === '5' ? 'flex' : 'hidden'"
              >
                Mulai Tes
              </button>
            </div>
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
