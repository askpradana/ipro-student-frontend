import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStores } from '@/stores/userStores'
import { isProfileComplete } from '@/utils/profileUtils'
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
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore()
      if (authStore.isAuthenticated) {
        // Redirect authenticated users to their role-specific dashboard
        switch (authStore.user?.role) {
          case 'USER':
            next({ name: 'dashboard' })
            break
          case 'ADMIN':
            next({ name: 'AdminDashboard' })
            break
          default:
            next()
        }
      } else {
        // Allow unauthenticated users to access landing page
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
      if (authStore.isAuthenticated) {
        // Redirect to role-specific dashboard if authenticated
        switch (authStore.user?.role) {
          case 'USER':
            next({ name: 'dashboard' })
            break
          case 'ADMIN':
            next({ name: 'AdminDashboard' })
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
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role as string

  // Check for JWT parameter and handle external authentication
  const jwtToken = to.query.jwt as string
  if (jwtToken && !isAuthenticated) {
    try {
      // Remove JWT from URL immediately to clean up
      const cleanQuery = { ...to.query }
      delete cleanQuery.jwt

      // Attempt external login
      await authStore.loginExternal(jwtToken)

      // Initialize user store to check profile completeness
      const userStore = useUserStores()
      await userStore.initializeQuiz()

      // Check if profile is complete
      if (!isProfileComplete(userStore.dataUser)) {
        // Redirect to profile completion if incomplete
        next({
          name: 'profile-completion',
          query: cleanQuery,
          replace: true
        })
        return
      }

      // Redirect to dashboard on successful authentication and complete profile
      next({
        name: 'dashboard',
        query: cleanQuery,
        replace: true
      })
      return
    } catch (error) {
      console.error('External authentication failed:', error)
      // Redirect to login on failure, removing JWT from URL
      const cleanQuery = { ...to.query }
      delete cleanQuery.jwt
      next({
        name: 'login',
        query: cleanQuery,
        replace: true
      })
      return
    }
  }

  // If JWT parameter exists but user is already authenticated, clean URL
  if (jwtToken && isAuthenticated) {
    const cleanQuery = { ...to.query }
    delete cleanQuery.jwt
    next({
      path: to.path,
      query: cleanQuery,
      replace: true
    })
    return
  }

  // Check if authenticated user is trying to access root/landing page
  if (to.name === 'home' && isAuthenticated) {
    // For USER role, check profile completeness before redirecting
    if (userRole === 'USER') {
      const userStore = useUserStores()
      // Initialize user data if not already loaded
      if (!userStore.dataUser) {
        try {
          await userStore.initializeQuiz()
        } catch (error) {
          console.error('Failed to load user profile:', error)
          next({ name: 'login' })
          return
        }
      }

      // Check if profile is complete
      if (!isProfileComplete(userStore.dataUser)) {
        next({ name: 'profile-completion' })
        return
      }

      next({ name: 'dashboard' })
    } else {
      // Redirect authenticated users to their role-specific dashboard
      switch (userRole) {
        case 'ADMIN':
          next({ name: 'AdminDashboard' })
          break
        default:
          next({ name: 'login' }) // Fallback to login if role is not recognized
      }
    }
    return
  }

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next({ name: 'login' })
    return
  }

  // Check profile completeness for USER role accessing protected routes
  if (isAuthenticated && userRole === 'USER' && to.meta.requiresRole?.includes('USER') && to.name !== 'profile-completion') {
    const userStore = useUserStores()
    // Initialize user data if not already loaded
    if (!userStore.dataUser) {
      try {
        await userStore.initializeQuiz()
      } catch (error) {
        console.error('Failed to load user profile:', error)
        next({ name: 'login' })
        return
      }
    }

    // Check if profile is complete
    if (!isProfileComplete(userStore.dataUser)) {
      next({ name: 'profile-completion' })
      return
    }
  }

  // Check if route requires specific role
  if (to.meta.requiresRole && isAuthenticated && !to.meta.requiresRole.includes(userRole)) {
    // Redirect to role-specific dashboard if role is not allowed
    switch (userRole) {
      case 'USER':
        next({ name: 'dashboard' })
        break
      case 'ADMIN':
        next({ name: 'AdminDashboard' })
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
