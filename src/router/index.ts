import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SampleChartView from '@/views/SampleChartView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AddNewUsersView from '@/views/AddNewUsersView.vue'
import ViewerDashboardView from '@/views/viewer/ViewerDashboardView.vue'
import CalculateView from '@/views/viewer/CalculateView.vue'

// Define custom meta type
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresRole?: string[] // Array of roles
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/LandingView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        // Redirect to role-specific dashboard if authenticated
        switch (authStore.user?.role) {
          case 'USER':
            next({ name: 'dashboard' })
            break
          case 'ADMIN':
            next({ name: 'AdminDashboard' })
            break
          case 'VIEWER':
            next({ name: 'viewer-dashboard' })
            break
          default:
            next()
        }
      } else {
        next()
      }
    },
  },
  {
    path: '/chart',
    name: 'chart',
    component: SampleChartView,
    meta: { requiresAuth: true, requiresRole: ['ADMIN', 'VIEWER'] }, // Use array for multiple roles
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, requiresRole: ['USER'] },
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('../views/ResultsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuizView.vue'),
    meta: { requiresAuth: true, requiresRole: ['USER'] },
  },
  {
    path: '/completed',
    name: 'quiz-completed',
    component: () => import('../views/CompletedQuizView.vue'),
    meta: { requiresAuth: true, requiresRole: ['USER'] },
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresRole: ['ADMIN'] },
  },
  {
    path: '/admin/add-users',
    name: 'add-users',
    component: AddNewUsersView,
    meta: { requiresAuth: true, requiresRole: ['ADMIN'] }, // Use array for multiple roles
  },
  {
    path: '/viewer/dashboard',
    name: 'viewer-dashboard',
    component: ViewerDashboardView,
    meta: { requiresAuth: true, requiresRole: ['VIEWER'] },
  },
  {
    path: '/user/calculate/:userId',
    name: 'user-calculate',
    component: CalculateView,
    meta: { requiresAuth: true, requiresRole: ['ADMIN', 'VIEWER'] }, // Use array for multiple roles
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role as string

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' })
    return
  }

  // Check if route requires specific role
  if (to.meta.requiresRole && !to.meta.requiresRole.includes(userRole)) {
    // Redirect to role-specific dashboard if role is not allowed
    switch (userRole) {
      case 'USER':
        next({ name: 'dashboard' })
        break
      case 'ADMIN':
        next({ name: 'AdminDashboard' })
        break
      case 'VIEWER':
        next({ name: 'viewer-dashboard' })
        break
      default:
        next({ name: 'login' }) // Fallback to login if role is not recognized
    }
    return
  }

  // Allow access to the route
  next()
})

export default router
