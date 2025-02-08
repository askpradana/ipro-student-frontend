import { defineStore } from 'pinia'

interface User {
  email: string
  // Add more user fields as needed
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email: string, password: string) {
      // Mock authentication
      // In real app, this would make an API call
      if (email && password) {
        const userData = { email }
        this.user = userData
        this.isAuthenticated = true

        // Store auth state in localStorage
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isAuthenticated', 'true')

        return true
      }
      return false
    },

    logout() {
      this.user = null
      this.isAuthenticated = false

      // Clear stored auth state
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    // Initialize auth state from localStorage
    initializeAuth() {
      const storedUser = localStorage.getItem('user')
      const storedIsAuthenticated = localStorage.getItem('isAuthenticated')

      if (storedUser && storedIsAuthenticated === 'true') {
        this.user = JSON.parse(storedUser)
        this.isAuthenticated = true
      }
    }
  },
})