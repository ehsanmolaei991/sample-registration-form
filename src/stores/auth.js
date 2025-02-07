import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const userData = ref({})

  const checkAuth = () => {
    const savedData = localStorage.getItem('registrationData')
    if (savedData) {
      userData.value = JSON.parse(savedData)
      isLoggedIn.value = true
    }
  }

  const login = (data) => {
    userData.value = data
    isLoggedIn.value = true
    localStorage.setItem('registrationData', JSON.stringify(data))
  }

  const logout = () => {
    userData.value = {}
    isLoggedIn.value = false
    localStorage.removeItem('registrationData')
  }

  // Initialize store
  checkAuth()

  return {
    isLoggedIn,
    userData,
    login,
    logout,
    checkAuth
  }
})
