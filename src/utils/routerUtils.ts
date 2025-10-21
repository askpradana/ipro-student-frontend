import type { Router, RouteLocationNormalized, LocationQuery } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStores } from '@/stores/userStores'
import { isProfileComplete } from '@/utils/profileUtils'

export interface NavigationResult {
  shouldNavigate: boolean
  redirectTo?: string
  preserveQuery?: boolean
}

/**
 * Determines the appropriate dashboard route based on user role
 */
export function getRoleDashboard(role: string): string {
  switch (role) {
    case 'USER':
      return '/dashboard'
    case 'ADMIN':
      return '/admin/dashboard'
    case 'VIEWER':
      return '/viewer/dashboard'
    default:
      return '/login'
  }
}

/**
 * Checks if a route is a public route that doesn't require authentication
 */
export function isPublicRoute(routeName: string | null | undefined): boolean {
  const publicRoutes = ['home', 'about', 'login']
  return publicRoutes.includes(routeName as string)
}

/**
 * Handles authentication redirect logic for protected routes
 */
export async function handleAuthRedirect(
  to: RouteLocationNormalized,
  authStore: ReturnType<typeof useAuthStore>
): Promise<NavigationResult> {
  const { isAuthenticated, user } = authStore
  const userRole = user?.role

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return {
      shouldNavigate: true,
      redirectTo: '/login'
    }
  }

  // For USER role, check profile completeness on protected routes
  if (userRole === 'USER' && to.meta.requiresRole?.includes('USER') && to.name !== 'profile-completion') {
    const userStore = useUserStores()

    // Initialize user data if not loaded
    if (!userStore.dataUser) {
      try {
        await userStore.initializeQuiz()
      } catch (error) {
        console.error('Failed to load user profile:', error)
        return {
          shouldNavigate: true,
          redirectTo: '/login'
        }
      }
    }

    // Check profile completeness
    if (!isProfileComplete(userStore.dataUser)) {
      return {
        shouldNavigate: true,
        redirectTo: '/profile/complete'
      }
    }
  }

  return { shouldNavigate: false }
}

/**
 * Handles role-based access control for routes
 */
export function handleRoleAccess(
  to: RouteLocationNormalized,
  userRole: string
): NavigationResult {
  const requiredRoles = to.meta.requiresRole

  // Route doesn't require specific role
  if (!requiredRoles) {
    return { shouldNavigate: false }
  }

  // User has required role
  if (requiredRoles.includes(userRole)) {
    return { shouldNavigate: false }
  }

  // User doesn't have required role - redirect to their dashboard
  return {
    shouldNavigate: true,
    redirectTo: getRoleDashboard(userRole || '')
  }
}

/**
 * Handles landing page redirects for authenticated users
 */
export async function handleLandingPageRedirect(
  authStore: ReturnType<typeof useAuthStore>
): Promise<NavigationResult> {
  const { isAuthenticated, user } = authStore
  const userRole = user?.role

  if (!isAuthenticated) {
    return { shouldNavigate: false }
  }

  // For USER role, check profile completeness
  if (userRole === 'USER') {
    const userStore = useUserStores()

    if (!userStore.dataUser) {
      try {
        await userStore.initializeQuiz()
      } catch (error) {
        console.error('Failed to load user profile:', error)
        return {
          shouldNavigate: true,
          redirectTo: '/login'
        }
      }
    }

    if (!isProfileComplete(userStore.dataUser)) {
      return {
        shouldNavigate: true,
        redirectTo: '/profile/complete'
      }
    }
  }

  return {
    shouldNavigate: true,
    redirectTo: getRoleDashboard(userRole || '')
  }
}

/**
 * Handles login page access for already authenticated users
 */
export function handleLoginPageAccess(
  authStore: ReturnType<typeof useAuthStore>
): NavigationResult {
  const { isAuthenticated, user } = authStore

  if (!isAuthenticated) {
    return { shouldNavigate: false }
  }

  return {
    shouldNavigate: true,
    redirectTo: getRoleDashboard(user?.role || '')
  }
}

/**
 * Safely navigates to a route with error handling
 */
export async function safeNavigate(
  router: Router,
  to: string,
  options: { query?: LocationQuery; replace?: boolean } = {}
): Promise<void> {
  try {
    const navigationMethod = options.replace ? router.replace : router.push
    await navigationMethod({
      path: to,
      query: options.query
    })
  } catch (error) {
    console.error('Navigation failed:', error)
    // Fallback navigation
    try {
      await router.push('/login')
    } catch (fallbackError) {
      console.error('Fallback navigation failed:', fallbackError)
    }
  }
}