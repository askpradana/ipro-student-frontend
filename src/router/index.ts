import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useExternalAuth } from '@/composables/useExternalAuth'
import {
  handleAuthRedirect,
  handleRoleAccess,
  handleLandingPageRedirect,
  handleLoginPageAccess,
  safeNavigate,
} from '@/utils/routerUtils'
import SampleChartView from '@/views/SampleChartView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AddNewUsersView from '@/views/AddNewUsersView.vue'
import AddNewStudentsView from '@/views/AddNewStudentsView.vue'
import AgreementView from '@/views/AgreementView.vue'

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
    beforeEnter: async (to, from, next) => {
      const authStore = useAuthStore()

      // Skip redirect logic if there's a JWT token (handled by global guard)
      if (to.query.jwt) {
        next()
        return
      }

      try {
        const result = await handleLandingPageRedirect(authStore)
        if (result.shouldNavigate && result.redirectTo) {
          next({ path: result.redirectTo })
        } else {
          next()
        }
      } catch (error) {
        console.error('Error in landing page redirect:', error)
        next()
      }
    },
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
      const { state: externalAuthState } = useExternalAuth()

      // Allow access if external auth is in progress
      if (externalAuthState.value.isProcessing) {
        next()
        return
      }

      // Skip redirect logic if there's a JWT token (handled by global guard)
      if (to.query.jwt) {
        next()
        return
      }

      try {
        const result = handleLoginPageAccess(authStore)
        if (result.shouldNavigate && result.redirectTo) {
          next({ path: result.redirectTo })
        } else {
          next()
        }
      } catch (error) {
        console.error('Error in login page access check:', error)
        next()
      }
    },
  },
  {
    path: '/chart',
    name: 'chart',
    component: SampleChartView,
    meta: { requiresAuth: true, requiresRole: ['ADMIN'] },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, requiresRole: ['USER'] },
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: AgreementView,
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
    path: '/profile/complete',
    name: 'profile-completion',
    component: () => import('../views/ProfileCompletionView.vue'),
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
    path: '/admin/add-students',
    name: 'add-students',
    component: AddNewStudentsView,
    meta: { requiresAuth: true, requiresRole: ['ADMIN'] }, // Use array for multiple roles
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const { processExternalJWT, cleanJWTFromURL } = useExternalAuth()
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role as string

  // Check for JWT parameter and handle external authentication
  const jwtToken = to.query.jwt as string
  if (jwtToken && !isAuthenticated) {
    try {
      console.log('Processing external JWT token')

      const result = await processExternalJWT(jwtToken)

      if (result.success && result.redirectTo) {
        // Clean JWT from URL and redirect to appropriate route
        cleanJWTFromURL(router, to.query)

        const cleanQuery = { ...to.query }
        delete cleanQuery.jwt

        await safeNavigate(router, result.redirectTo, {
          query: cleanQuery,
          replace: true,
        })
        return
      } else {
        // External auth failed - clean URL and redirect to login
        console.error('External authentication failed')
        cleanJWTFromURL(router, to.query)

        const cleanQuery = { ...to.query }
        delete cleanQuery.jwt

        await safeNavigate(router, '/login', {
          query: cleanQuery,
          replace: true,
        })
        return
      }
    } catch (error) {
      console.error('External authentication error:', error)
      // Clean URL and redirect to login on any error
      cleanJWTFromURL(router, to.query)

      const cleanQuery = { ...to.query }
      delete cleanQuery.jwt

      await safeNavigate(router, '/login', {
        query: cleanQuery,
        replace: true,
      })
      return
    }
  }

  // If JWT parameter exists but user is already authenticated, clean URL
  if (jwtToken && isAuthenticated) {
    cleanJWTFromURL(router, to.query)
    next()
    return
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    const result = await handleAuthRedirect(to, authStore)
    if (result.shouldNavigate && result.redirectTo) {
      next({ path: result.redirectTo })
      return
    }
  }

  // Check if route requires specific role
  if (to.meta.requiresRole && isAuthenticated) {
    const result = handleRoleAccess(to, userRole)
    if (result.shouldNavigate && result.redirectTo) {
      next({ path: result.redirectTo })
      return
    }
  }

  // Additional check for profile completeness on USER role protected routes
  if (
    isAuthenticated &&
    userRole === 'USER' &&
    to.meta.requiresRole?.includes('USER') &&
    to.name !== 'profile-completion'
  ) {
    try {
      const authResult = await handleAuthRedirect(to, authStore)
      if (authResult.shouldNavigate && authResult.redirectTo) {
        next({ path: authResult.redirectTo })
        return
      }
    } catch (error) {
      console.error('Error checking profile completeness:', error)
      next({ name: 'login' })
      return
    }
  }

  // Allow access to the route
  next()
})

export default router
