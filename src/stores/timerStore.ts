import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { notify } from '@/lib/notify'
import { useQuizStore } from './quizStore'
import { useRouter } from 'vue-router'

export const useTimerStore = defineStore('timer', () => {
  const quizStore = useQuizStore()
  const router = useRouter()
  const timer = ref(60 * 50) // 20 menit dalam detik (ubah ke 3600 untuk 1 jam)
  let timerInterval: ReturnType<typeof setInterval> | null = null

  // Fungsi untuk mengubah detik ke format HH:MM:SS
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0')
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  // Computed property untuk format HH:MM:SS
  const formattedTime = computed(() => formatTime(timer.value))

  const sumbitQuizHandler = () => {
    quizStore
      .submitFinalAnswer()
      .then(() => {
        if (quizStore.error) {
          notify(quizStore.error, 'error')
        } else {
          notify(quizStore.message, 'success')

          setTimeout(() => {
            router.push('/dashboard')
            quizStore.typeQuiz = 0
            quizStore.isComplete = false
            quizStore.resetQuiz()
          }, 1500)
        }
      })
      .finally(() => stopTimer())
  }

  // Start Timer
  const startTimer = () => {
    if (timerInterval) clearInterval(timerInterval) // Pastikan tidak ada interval berjalan

    timerInterval = setInterval(() => {
      if (timer.value > 0) {
        timer.value--
      } else {
        sumbitQuizHandler()
      }
    }, 1000)
  }

  // Hentikan timer
  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval)
      timerInterval = null
    }
  }

  const setTimer = (newTime = 1200) => {
    timer.value = newTime
  }

  // Reset timer ke waktu awal (bisa dikustomisasi)
  const resetTimer = (newTime = 1200) => {
    stopTimer()
    timer.value = newTime
  }

  return {
    timer,
    formattedTime,
    setTimer,
    startTimer,
    stopTimer,
    resetTimer,
  }
})
