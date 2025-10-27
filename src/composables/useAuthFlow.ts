import { readonly, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUserStores } from '@/stores/userStores'
import { isProfileComplete } from '@/utils/profileUtils'
import type { Router, LocationQuery } from 'vue-router'

// Auth flow states
export type AuthFlowState =
  | 'idle'
  | 'processing_jwt'
  | 'authenticating'
  | 'loading_profile'
  | 'checking_profile'
  | 'success'
  | 'error'

export interface AuthFlowData {
  state: AuthFlowState
  isProcessing: boolean
  error: string | null
  redirectTo: string | null
  hasBeenProcessed: boolean
  debugInfo: {
    tokenReceived: boolean
    tokenStored: boolean
    profileLoaded: boolean
    profileComplete: boolean | null
  }
}

// Create reactive state
const authFlowState = reactive<AuthFlowData>({
  state: 'idle',
  isProcessing: false,
  error: null,
  redirectTo: null,
  hasBeenProcessed: false,
  debugInfo: {
    tokenReceived: false,
    tokenStored: false,
    profileLoaded: false,
    profileComplete: null
  }
})

export function useAuthFlow() {
  const authStore = useAuthStore()
  const userStore = useUserStores()

  const setState = (newState: AuthFlowState) => {
    authFlowState.state = newState
    authFlowState.isProcessing = ['processing_jwt', 'authenticating', 'loading_profile', 'checking_profile'].includes(newState)
  }

  const setError = (error: string) => {
    authFlowState.error = error
    authFlowState.state = 'error'
    authFlowState.isProcessing = false
  }

  const resetState = () => {
    authFlowState.state = 'idle'
    authFlowState.isProcessing = false
    authFlowState.error = null
    authFlowState.redirectTo = null
    authFlowState.hasBeenProcessed = false
    authFlowState.debugInfo = {
      tokenReceived: false,
      tokenStored: false,
      profileLoaded: false,
      profileComplete: null
    }
  }

  const processExternalJWT = async (
    token: string
  ): Promise<{ success: boolean; redirectTo?: string }> => {
    // Prevent multiple concurrent processing
    if (authFlowState.isProcessing) {
      console.warn('Auth flow already in progress, skipping...')
      return { success: false }
    }

    // Prevent re-processing
    if (authFlowState.hasBeenProcessed) {
      console.warn('JWT already processed, skipping...')
      return { success: false }
    }

    console.log('=== Starting External JWT Authentication Flow ===')

    try {
      // Step 1: Initialize processing
      setState('processing_jwt')
      authFlowState.hasBeenProcessed = true
      authFlowState.debugInfo.tokenReceived = true

      console.log('Step 1: JWT token received, starting authentication...')

      // Step 2: Authenticate with external token
      setState('authenticating')
      const role = await authStore.loginExternal(token)

      if (!role) {
        throw new Error('External authentication failed - no role returned')
      }

      authFlowState.debugInfo.tokenStored = true
      console.log(`Step 2: Authentication successful, role: ${role}`)

      // Step 3: Handle role-specific logic
      if (role === 'USER') {
        // Step 3a: Wait for token to be available
        console.log('Step 3a: Waiting for token to be available...')
        const tokenReady = await authStore.waitForToken(5000) // Wait up to 5 seconds

        if (!tokenReady) {
          throw new Error('Token not available after authentication - timing issue detected')
        }

        // Step 3b: Load user profile
        setState('loading_profile')
        console.log('Step 3b: Loading user profile...')

        try {
          await userStore.initializeQuiz()
          authFlowState.debugInfo.profileLoaded = true
          console.log('Step 3b: User profile loaded successfully')
        } catch (error) {
          console.warn('Step 3b: Failed to load user profile:', error)
          authFlowState.debugInfo.profileLoaded = false

          // If profile loading fails, redirect to profile completion
          setState('success')
          authFlowState.redirectTo = '/profile/complete'
          return {
            success: true,
            redirectTo: '/profile/complete'
          }
        }

        // Step 3c: Check profile completeness
        setState('checking_profile')
        console.log('Step 3c: Checking profile completeness...')

        const isComplete = isProfileComplete(userStore.dataUser)
        authFlowState.debugInfo.profileComplete = isComplete

        if (!isComplete) {
          console.log('Step 3c: Profile incomplete, redirecting to profile completion')
          setState('success')
          authFlowState.redirectTo = '/profile/complete'
          return {
            success: true,
            redirectTo: '/profile/complete'
          }
        }

        console.log('Step 3c: Profile complete, redirecting to dashboard')
        setState('success')
        authFlowState.redirectTo = '/dashboard'
        return {
          success: true,
          redirectTo: '/dashboard'
        }

      } else if (role === 'ADMIN') {
        setState('success')
        authFlowState.redirectTo = '/admin/dashboard'
        return {
          success: true,
          redirectTo: '/admin/dashboard'
        }
      } else if (role === 'VIEWER') {
        setState('success')
        authFlowState.redirectTo = '/viewer/dashboard'
        return {
          success: true,
          redirectTo: '/viewer/dashboard'
        }
      }

      // Unknown role
      throw new Error(`Unknown role: ${role}`)

    } catch (error) {
      console.error('=== External JWT Authentication Failed ===')
      console.error('Error:', error)
      console.error('Debug info:', authFlowState.debugInfo)

      // Clear any partial auth state
      authStore.clearAuthState()

      const errorMessage = error instanceof Error ? error.message : 'External authentication failed'
      setError(errorMessage)

      return {
        success: false,
        redirectTo: '/login'
      }
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

  const debugAuthFlow = () => {
    console.log('=== Auth Flow Debug Info ===')
    console.log('State:', authFlowState.state)
    console.log('Is Processing:', authFlowState.isProcessing)
    console.log('Error:', authFlowState.error)
    console.log('Redirect To:', authFlowState.redirectTo)
    console.log('Has Been Processed:', authFlowState.hasBeenProcessed)
    console.log('Debug Info:', authFlowState.debugInfo)

    // Also debug auth store
    authStore.debugTokenStatus()
    console.log('============================')
  }

  return {
    state: readonly(authFlowState),
    processExternalJWT,
    cleanJWTFromURL,
    resetState,
    debugAuthFlow
  }
}