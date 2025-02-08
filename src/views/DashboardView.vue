<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Logo area -->
    <div class="mb-12 animate-fade-in">
      <h1
        class="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent"
      >
        EduMind
      </h1>
    </div>

    <!-- Main content area -->
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Quiz Button -->
      <button
        @click="handleTakeQuiz"
        class="w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 hover:bg-white hover:scale-[1.02] hover:border-teal-100 active:scale-[0.98] transition-all duration-300 ease-out text-left group"
      >
        <h2
          class="text-xl font-bold text-teal-600 mb-2 group-hover:translate-x-1 transition-transform duration-300"
        >
          Take Quiz
        </h2>
        <p class="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          Start a new assessment to test your knowledge
        </p>
      </button>

      <!-- Results Button -->
      <button
        @click="handleSeeResults"
        class="w-full p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 hover:bg-white hover:scale-[1.02] hover:border-emerald-100 active:scale-[0.98] transition-all duration-300 ease-out text-left group"
      >
        <h2
          class="text-xl font-bold text-emerald-600 mb-2 group-hover:translate-x-1 transition-transform duration-300"
        >
          See Results
        </h2>
        <p class="text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
          View your past quiz results and progress
        </p>
      </button>
    </div>

    <!-- Utility buttons -->
    <div class="fixed bottom-8 left-8 space-y-4">
      <button
        @click="handleHelp"
        class="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 hover:bg-white hover:scale-110 hover:border-teal-100 active:scale-90 transition-all duration-300 ease-out flex items-center justify-center group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-slate-500 group-hover:stroke-teal-600 transition-colors duration-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>

      <button
        @click="handleLogout"
        class="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-100 hover:bg-white hover:scale-110 hover:border-teal-100 active:scale-90 transition-all duration-300 ease-out flex items-center justify-center group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          class="w-6 h-6 stroke-slate-500 group-hover:stroke-teal-600 transition-colors duration-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleTakeQuiz = () => {
  // Will be implemented later
  console.log('Navigate to quiz')
}

const handleSeeResults = () => {
  router.push('/results')
}

const handleHelp = () => {
  // Will be implemented later
  console.log('Show help')
}

const handleLogout = () => {
  // Will be implemented later
  router.push('/')
}
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
