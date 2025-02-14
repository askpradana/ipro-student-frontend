import { defineStore } from 'pinia'
import { handleApiResponse } from '@/utils/apiInterceptor'

// Add custom error class and improved interfaces
class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

interface User {
  email: string
  role: string
  token: string
  refreshToken?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface ApiResponse {
  message: string
  code: number
  status: string
  data?: {
    role: string
    token: string
    refreshToken?: string
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAdmin(): boolean {
      return this.user?.role === 'admin'
    },
    getToken(): string | null {
      return this.user?.token || null
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
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const data: ApiResponse = await handleApiResponse(response)

        if (data.status === 'error') {
          throw new AuthError(data.message)
        }

        if (data.data) {
          const userData: User = {
            email,
            role: data.data.role,
            token: data.data.token,
            refreshToken: data.data.refreshToken,
          }

          // Update authentication state
          this.user = userData
          this.isAuthenticated = true

          // Store auth state in localStorage
          localStorage.setItem('user', JSON.stringify(userData))
          localStorage.setItem('isAuthenticated', 'true')

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

    async logout() {
      try {
        if (!this.user?.token) {
          this.clearAuthState()
          return true
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {
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
    async refreshToken() {
      try {
        if (!this.user?.refreshToken) {
          throw new AuthError('No refresh token available')
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken: this.user.refreshToken }),
        })

        const data: ApiResponse = await handleApiResponse(response)

        if (data.status === 'success' && data.data?.token) {
          this.user = {
            ...this.user,
            token: data.data.token,
          }
          localStorage.setItem('user', JSON.stringify(this.user))
          return true
        }

        throw new AuthError('Token refresh failed')
      } catch (error) {
        console.error('Token refresh error:', error)
        this.clearAuthState()
        throw error instanceof Error ? new AuthError(error.message) : error
      }
    },

    // Initialize auth state from localStorage
    initializeAuth() {
      const storedUser = localStorage.getItem('user')
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated')

      if (storedUser && storedIsAuthenticated === 'true') {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
      }
    },
  },
})
