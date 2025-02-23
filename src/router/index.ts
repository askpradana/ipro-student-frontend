import { createRouter, createWebHistory } from 'vue-router'
import { requireAuth, redirectIfAuthenticated } from './auth-guard'
import SampleChartView from '@/views/SampleChartView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AddNewUsersView from '@/views/AddNewUsersView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingView.vue'),
      beforeEnter: redirectIfAuthenticated,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: redirectIfAuthenticated,
    },
    {
      path: '/chart',
      name: 'chart',
      component: SampleChartView,
      beforeEnter: requireAuth,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: requireAuth,
      meta: { requiresAuth: true },
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('../views/ResultsView.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/QuizView.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/completed',
      name: 'quiz-completed',
      component: () => import('../views/CompletedQuizView.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('@/views/AdminDashboardView.vue'),
      beforeEnter: requireAuth,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/admin/add-users',
      name: 'add-users',
      component: AddNewUsersView,
      beforeEnter: requireAuth,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
  ],
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // If route requires auth and user is not authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  next()
})

export default router
