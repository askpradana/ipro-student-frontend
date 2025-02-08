<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
    <!-- Header Section -->
    <header class="max-w-6xl mx-auto p-4 sm:p-6">
      <div class="flex justify-between items-center mb-8 sm:mb-16">
        <div
          class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent animate-fade-in"
        >
          EduMind Test
        </div>
        <RouterLink
          to="/login"
          class="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25 text-sm sm:text-base"
        >
          Login
        </RouterLink>
      </div>

      <!-- Hero Section -->
      <div class="text-center mb-16 sm:mb-24 animate-slide-up">
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-teal-600 via-emerald-600 to-green-600 bg-clip-text text-transparent"
        >
          Discover Your Academic Potential
        </h1>
        <p class="text-lg sm:text-xl mb-8 sm:mb-12 text-slate-600 max-w-2xl mx-auto px-4">
          Professional psychometric testing designed specifically for students. Understand your
          learning style, cognitive strengths, and career aptitudes with our research-backed
          assessments.
        </p>
        <button
          class="px-6 sm:px-8 py-3 sm:py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/25"
        >
          Take Free Assessment
        </button>
      </div>
    </header>

    <!-- Features Grid -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-teal-600">🧠</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Cognitive Assessment</h3>
          <p class="text-slate-600">
            Evaluate memory, problem-solving, and analytical thinking capabilities.
          </p>
        </div>
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-emerald-600">📚</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Learning Style Analysis</h3>
          <p class="text-slate-600">
            Understand your optimal learning methods and study preferences.
          </p>
        </div>
        <div
          class="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <span class="text-2xl text-green-600">🎯</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Career Guidance</h3>
          <p class="text-slate-600">
            Get personalized career recommendations based on your abilities.
          </p>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="bg-white py-12 sm:py-16 mb-16 sm:mb-24">
      <div class="max-w-6xl mx-auto px-4 md:px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <p class="text-4xl font-bold text-teal-600 mb-2">50,000+</p>
            <p class="text-slate-600">Students Tested</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-emerald-600 mb-2">95%</p>
            <p class="text-slate-600">Accuracy Rate</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-green-600 mb-2">200+</p>
            <p class="text-slate-600">Partner Schools</p>
          </div>
          <div class="text-center">
            <p class="text-4xl font-bold text-teal-600 mb-2">15+</p>
            <p class="text-slate-600">Test Categories</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
        <div class="text-center">
          <div
            class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl">1</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Take the Assessment</h3>
          <p class="text-slate-600">
            Complete our comprehensive psychometric tests at your own pace
          </p>
        </div>
        <div class="text-center">
          <div
            class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl">2</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Get Your Results</h3>
          <p class="text-slate-600">Receive detailed insights about your cognitive profile</p>
        </div>
        <div class="text-center">
          <div
            class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-2xl">3</span>
          </div>
          <h3 class="text-xl font-semibold mb-3">Personalized Guidance</h3>
          <p class="text-slate-600">Get tailored recommendations for academic and career success</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-6xl mx-auto mb-16 sm:mb-24 px-4 md:px-6">
      <div
        class="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-8 sm:p-12 text-center text-white"
      >
        <h2 class="text-3xl font-bold mb-6">Ready to Understand Your Potential?</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students who have gained valuable insights into their academic strengths
          and career paths.
        </p>
        <button
          class="px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-slate-100 transition-all"
        >
          Start Free Assessment
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="max-w-6xl mx-auto pt-8 sm:pt-12 pb-6 px-4 md:px-6 border-t border-slate-200">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="text-slate-500 text-sm sm:text-base">
          © 2024 EduMind Test. All rights reserved.
        </div>
        <div class="flex gap-6 sm:gap-8 text-slate-600 text-sm sm:text-base">
          <a href="#" class="hover:text-teal-600 transition-colors">Terms</a>
          <a href="#" class="hover:text-teal-600 transition-colors">Privacy</a>
          <a href="#" class="hover:text-teal-600 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
}
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

/* Add smooth scrolling to the whole page */
html {
  scroll-behavior: smooth;
}

/* Ensure images don't overflow on mobile */
img {
  max-width: 100%;
  height: auto;
}

/* Improve touch targets on mobile */
button,
a {
  @apply cursor-pointer;
  min-height: 44px;
  min-width: 44px;
}

/* Prevent horizontal overflow */
.max-w-6xl {
  @apply px-4 md:px-6;
}
</style>
