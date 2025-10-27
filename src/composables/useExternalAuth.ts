import { ref, readonly } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStores } from '@/stores/userStores'
import { isProfileComplete } from '@/utils/profileUtils'
import type { Router, LocationQuery } from 'vue-router'

interface ExternalAuthState {
  isProcessing: boolean
  error: string | null
  hasBeenProcessed: boolean
}

const state = ref<ExternalAuthState>({
  isProcessing: false,
  error: null,
  hasBeenProcessed: false
})

export function useExternalAuth() {
  const authStore = useAuthStore()
  const userStore = useUserStores()

  const resetState = () => {
    state.value = {
      isProcessing: false,
      error: null,
      hasBeenProcessed: false
    }
  }

  const processExternalJWT = async (
    token: string
  ): Promise<{ success: boolean; redirectTo?: string }> => {
    // Prevent multiple concurrent processing
    if (state.value.isProcessing) {
      return { success: false }
    }

    // Mark as already processed to prevent re-processing
    if (state.value.hasBeenProcessed) {
      return { success: false }
    }

    state.value.isProcessing = true
    state.value.error = null
    state.value.hasBeenProcessed = true

    try {
      // Step 1: Authenticate with external token
      const role = await authStore.loginExternal(token)

      if (!role) {
        throw new Error('External authentication failed - no role returned')
      }

      // Step 2: Initialize user data for profile checking (USER role only)
      if (role === 'USER') {
        try {
          // Add a small delay to ensure token is fully propagated
          await new Promise(resolve => setTimeout(resolve, 100))

          console.log('Initializing user data after external auth...')
          await userStore.initializeQuiz()
          console.log('User data initialized successfully')
        } catch (error) {
          console.warn('Failed to initialize user data after external auth:', error)
          // If profile loading fails, redirect to profile completion to be safe
          return {
            success: true,
            redirectTo: '/profile/complete'
          }
        }

        // Step 3: Check profile completeness
        const isComplete = isProfileComplete(userStore.dataUser)

        if (!isComplete) {
          console.log('Profile incomplete, redirecting to profile completion')
          return {
            success: true,
            redirectTo: '/profile/complete'
          }
        }

        console.log('Profile complete, redirecting to dashboard')
        return {
          success: true,
          redirectTo: '/dashboard'
        }
      } else if (role === 'ADMIN') {
        return {
          success: true,
          redirectTo: '/admin/dashboard'
        }
      } else if (role === 'VIEWER') {
        return {
          success: true,
          redirectTo: '/viewer/dashboard'
        }
      }

      // Unknown role - redirect to login
      throw new Error(`Unknown role: ${role}`)

    } catch (error) {
      console.error('External authentication failed:', error)

      // Clear any partial auth state
      authStore.clearAuthState()

      state.value.error = error instanceof Error ? error.message : 'External authentication failed'

      return {
        success: false,
        redirectTo: '/login'
      }
    } finally {
      state.value.isProcessing = false
    }
  }

  const cleanJWTFromURL = (router: Router, currentQuery: LocationQuery) => {
    const cleanQuery = { ...currentQuery }
    delete cleanQuery.jwt

    // Only update URL if there's a JWT parameter to remove
    if ('jwt' in currentQuery) {
      router.replace({
        query: cleanQuery
      }).catch(err => {
        console.warn('Failed to clean JWT from URL:', err)
      })
    }
  }

  return {
    state: readonly(state),
    processExternalJWT,
    cleanJWTFromURL,
    resetState
  }
}