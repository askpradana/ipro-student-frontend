import { useAuthStore } from '@/stores/auth'

export function requireAuth(to: any, from: any, next: any) {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
}

export function redirectIfAuthenticated(to: any, from: any, next: any) {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
}
