import { defineStore } from 'pinia'
import { handleApiResponse, type ApiResponse, type AuthModel } from '@/utils/apiInterceptor'
import { useExerciseStore } from './exerciseStore'

// Add custom error class and improved interfaces
class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

interface AuthState {
  user: AuthModel | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAdmin(): boolean {
      return this.user?.role === 'ADMIN'
    },
    getToken(): string | null {
      // Only return token if store is properly initialized and authenticated
      if (this.isAuthenticated && this.user?.token) {
        return this.user.token
      }
      return null
    },
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      try {
        // Input validation
        if (!email || !password) {
          throw new AuthError('Email and password are required')
        }

        // Add artificial delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Make API call to login endpoint
        const response: Response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const data: ApiResponse<AuthModel> = await handleApiResponse(response)

        if (data.status === 'error') {
          throw new AuthError(data.message)
        }

        if (data.data) {
          const userData: AuthModel = {
            role: data.data.role,
            token: data.data.token,
          }

          // Use atomic auth state update
          this.setAuthState(userData)

          // Return role for redirect handling
          return data.data.role
        }

        throw new AuthError('Invalid response format')
      } catch (error) {
        console.error('Login error:', error)
        this.clearAuthState()
        throw error instanceof Error ? new AuthError(error.message) : error
      } finally {
        this.isLoading = false
      }
    },

    async loginExternal(token: string, retryCount: number = 0): Promise<string> {
      this.isLoading = true
      try {
        // Input validation
        if (!token || token.trim() === '') {
          throw new AuthError('External token is required and cannot be empty')
        }

        // Validate token format (basic check)
        if (token.length < 10) {
          throw new AuthError('Invalid token format')
        }

        // Make API call to external login endpoint with timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const response: Response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/login/external`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
            signal: controller.signal,
          },
        )

        clearTimeout(timeoutId)

        const data: ApiResponse<AuthModel> = await handleApiResponse(response)

        if (data.status === 'error') {
          // Handle specific error cases
          if (data.message?.includes('token expired') || data.message?.includes('invalid token')) {
            throw new AuthError('The external authentication token has expired or is invalid')
          }
          throw new AuthError(data.message || 'External authentication failed')
        }

        if (data.data) {
          const userData: AuthModel = {
            role: data.data.role,
            token: data.data.token,
          }

          // Validate returned role (case-insensitive)
          const validRoles = ['USER', 'ADMIN', 'VIEWER']
          if (!validRoles.includes(userData.role.toUpperCase())) {
            throw new AuthError(`Invalid role received: ${userData.role}`)
          }

          // Validate token format
          if (!userData.token || userData.token.trim() === '') {
            throw new AuthError('Invalid token received from external authentication')
          }

          console.log(
            'External auth success - storing new token:',
            userData.token.substring(0, 20) + '...',
          )

          // Use atomic auth state update
          this.setAuthState(userData)

          // Verify token is properly accessible
          if (!this.verifyTokenAccess()) {
            console.error('Token verification failed after atomic storage')
            throw new AuthError('Token storage verification failed')
          }

          console.log('Token verification successful after external auth')

          // Return role for redirect handling
          return data.data.role
        }

        throw new AuthError('Invalid response format - no user data received')
      } catch (error) {
        console.error('External login error:', error)

        // Handle network errors with retry logic
        if (
          error instanceof Error &&
          (error.name === 'AbortError' || error.message.includes('fetch')) &&
          retryCount < 2
        ) {
          console.log(`Retrying external login (attempt ${retryCount + 1})`)
          await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second before retry
          return this.loginExternal(token, retryCount + 1)
        }

        // Clear any partial auth state on error
        this.clearAuthState()

        // Re-throw with more specific error message
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            throw new AuthError('External authentication timed out. Please try again.')
          }
          throw new AuthError(error.message)
        }

        throw new AuthError('An unexpected error occurred during external authentication')
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      const exerciseStore = useExerciseStore()
      try {
        if (!this.user?.token) {
          this.clearAuthState()
          return true
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.user?.token}`,
            'Content-Type': 'application/json',
          },
        })

        const data = await handleApiResponse(response)

        if (data.status === 'success') {
          // Clear auth state
          this.user = null
          this.isAuthenticated = false

          // Clear localStorage
          localStorage.removeItem('user')
          localStorage.removeItem('isAuthenticated')
          exerciseStore.updateExercise(0)

          // Return true to indicate successful logout
          return true
        }

        throw new AuthError(data.message || 'Logout failed')
      } catch (error) {
        console.error('Logout error:', error)
        this.clearAuthState()
        throw error instanceof Error ? new AuthError(error.message) : error
      }
    },

    // New method to handle auth state clearing
    clearAuthState() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    // New method to refresh token
    // async refreshToken() {
    //   try {
    //     if (!this.user?.refreshToken) {
    //       throw new AuthError('No refresh token available')
    //     }

    //     const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/refresh`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ refreshToken: this.user.refreshToken }),
    //     })

    //     const data: ApiResponse = await handleApiResponse(response)

    //     if (data.status === 'success' && data.data?.token) {
    //       this.user = {
    //         ...this.user,
    //         token: data.data.token,
    //       }
    //       localStorage.setItem('user', JSON.stringify(this.user))
    //       return true
    //     }

    //     throw new AuthError('Token refresh failed')
    //   } catch (error) {
    //     console.error('Token refresh error:', error)
    //     this.clearAuthState()
    //     throw error instanceof Error ? new AuthError(error.message) : error
    //   }
    // },

    // Initialize auth state from localStorage
    initializeAuth() {
      const storedUser = localStorage.getItem('user')
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated')

      if (storedUser && storedIsAuthenticated === 'true') {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
        console.log(
          'Auth initialized from localStorage with token:',
          this.user?.token?.substring(0, 20) + '...',
        )
      }
    },

    // Atomic method to update auth state and localStorage together
    setAuthState(userData: AuthModel) {
      // Update store state first
      this.user = userData
      this.isAuthenticated = true

      // Then update localStorage
      const authData = {
        ...userData,
        authenticatedAt: new Date().toISOString(),
      }
      localStorage.setItem('user', JSON.stringify(authData))
      localStorage.setItem('isAuthenticated', 'true')
    },

    // Method to verify token is properly stored and accessible
    verifyTokenAccess(): boolean {
      const storeToken = this.user?.token
      const isAuth = this.isAuthenticated

      if (!isAuth || !storeToken) {
        return false
      }

      // Verify token length is reasonable
      if (storeToken.length < 10) {
        console.error('Token appears to be invalid (too short)')
        return false
      }

      return true
    },

    // Method to wait for token to be available
    async waitForToken(maxWaitMs: number = 3000): Promise<string | null> {
      const startTime = Date.now()

      while (Date.now() - startTime < maxWaitMs) {
        if (this.verifyTokenAccess()) {
          return this.getToken
        }

        // Wait 50ms before checking again
        await new Promise((resolve) => setTimeout(resolve, 50))
      }

      console.error('Token wait timeout - token not available after', maxWaitMs, 'ms')
      return null
    },

    // Debug method to check token status
    debugTokenStatus() {
      console.log('=== Token Debug Info ===')
      console.log('Is authenticated:', this.isAuthenticated)
      console.log('User object:', this.user)
      console.log('Token from getter:', this.getToken?.substring(0, 20) + '...')
      console.log('Token verification:', this.verifyTokenAccess())
      console.log('LocalStorage user:', localStorage.getItem('user'))
      console.log('LocalStorage isAuthenticated:', localStorage.getItem('isAuthenticated'))
      console.log('========================')
    },
  },
})
