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
      try {
        // Input validation
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        // Make API call to login endpoint
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const userData = await response.json();

        // Update authentication state
        this.user = userData;
        this.isAuthenticated = true;

        // Store auth state in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        return true;
      } catch (error) {
        console.error('Login error:', error);
        this.isAuthenticated = false;
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        throw error;
      }
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