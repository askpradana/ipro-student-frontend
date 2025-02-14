import { useAuthStore } from '@/stores/auth'

export function requireAuth(to: any, from: any, next: any) {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    next({ name: 'login' })
    return
  }

  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    if (authStore.user?.role === 'ADMIN') {
      next()
    } else {
      // Redirect non-admin users to dashboard
      next({ name: 'dashboard' })
    }
    return
  }

  // Check if route is admin route but user is not admin
  if (to.path.startsWith('/admin') && authStore.user?.role !== 'ADMIN') {
    next({ name: 'dashboard' })
    return
  }

  // Check if user route but user is admin
  if (authStore.user?.role === 'ADMIN' && to.path === '/dashboard') {
    next({ name: 'AdminDashboard' })
    return
  }

  next()
}

export function redirectIfAuthenticated(to: any, from: any, next: any) {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) {
    // Redirect based on role
    if (authStore.user?.role === 'ADMIN') {
      next({ name: 'AdminDashboard' })
    } else {
      next({ name: 'dashboard' })
    }
    return
  }

  next()
}
