<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
    <!-- Header -->
    <div class="mb-12 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-teal-600">Quiz Results</h1>
      <button
        @click="router.push('/dashboard')"
        class="px-4 py-2 text-slate-600 hover:text-teal-600 transition-colors duration-300"
      >
        ← Back to Dashboard
      </button>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <!-- Personality Traits -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">Personality Traits</h2>
        <div class="h-64">
          <RadarChart :data="personalityData" :options="radarOptions" />
        </div>
      </div>

      <!-- Cognitive Abilities -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">Cognitive Abilities</h2>
        <div class="h-64">
          <BarChart :data="cognitiveData" :options="barOptions" />
        </div>
      </div>

      <!-- Emotional Intelligence Trends -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">EQ Development</h2>
        <div class="h-64">
          <LineChart :data="eqData" :options="lineOptions" />
        </div>
      </div>

      <!-- Statistics Summary -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 p-6">
        <h2 class="text-lg font-semibold text-slate-700 mb-4">Test Insights</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-slate-50 rounded-xl">
            <p class="text-sm text-slate-600">Dominant Trait</p>
            <p class="text-2xl font-bold text-teal-600">Openness</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl">
            <p class="text-sm text-slate-600">EQ Score</p>
            <p class="text-2xl font-bold text-emerald-600">128</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl">
            <p class="text-sm text-slate-600">Cognitive Strength</p>
            <p class="text-2xl font-bold text-teal-600">Analysis</p>
          </div>
          <div class="p-4 bg-slate-50 rounded-xl">
            <p class="text-sm text-slate-600">Tests Completed</p>
            <p class="text-2xl font-bold text-emerald-600">3</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line as LineChart, Bar as BarChart, Radar as RadarChart } from 'vue-chartjs'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const router = useRouter()

// Personality Traits Radar Chart
const personalityData = {
  labels: ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'],
  datasets: [
    {
      label: 'Your Personality Profile',
      data: [85, 65, 72, 78, 45],
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      borderColor: 'rgb(16, 185, 129)',
      pointBackgroundColor: 'rgb(16, 185, 129)',
      borderWidth: 2,
      pointRadius: 4,
    },
  ],
}

// Cognitive Abilities Bar Chart
const cognitiveData = {
  labels: ['Analytical', 'Numerical', 'Verbal', 'Abstract', 'Spatial'],
  datasets: [
    {
      label: 'Cognitive Scores',
      data: [88, 75, 82, 90, 70],
      backgroundColor: 'rgba(13, 148, 136, 0.8)',
      borderWidth: 1,
    },
  ],
}

// Emotional Intelligence Line Chart
const eqData = {
  labels: ['Self-Awareness', 'Self-Management', 'Social Awareness', 'Relationship Management'],
  datasets: [
    {
      label: 'EQ Components',
      data: [85, 78, 92, 88],
      fill: true,
      borderColor: 'rgb(13, 148, 136)',
      backgroundColor: 'rgba(13, 148, 136, 0.1)',
      tension: 0.3,
      borderWidth: 2,
    },
  ],
}

// Chart Options
const radarOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1,
  scales: {
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
      ticks: {
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}

const lineOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
}
</script>
