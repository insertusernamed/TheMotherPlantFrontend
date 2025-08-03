import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginRequest, CreateUserRequest } from '@/models/User'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('token'))

    const isLoggedIn = computed(() => !!token.value)

    const login = async (loginData: LoginRequest) => {
        const response = await fetch(import.meta.env.VITE_API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        })

        if (!response.ok) {
            throw new Error('Login failed')
        }

        const data = await response.json()
        token.value = data.token
        localStorage.setItem('token', data.token)

        user.value = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: loginData.email,
            points: data.points || 0,
            role: data.role || 'USER'
        }
    }

    const register = async (registerData: CreateUserRequest) => {
        const response = await fetch(import.meta.env.VITE_API_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
        })

        if (!response.ok) {
            throw new Error('Registration failed')
        }

        const data = await response.json()
        token.value = data.token
        localStorage.setItem('token', data.token)

        user.value = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        user,
        token,
        isLoggedIn,
        login,
        register,
        logout
    }
})
