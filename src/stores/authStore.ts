import { defineStore } from 'pinia'
import apiClient from '@/utils/apiClient'
import router from '@/router'
import type { User, LoginRequest, CreateUserRequest, AuthResponse } from '@/models/User'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as User | null,
        token: localStorage.getItem('token') as string | null
    }),

    getters: {
        isLoggedIn: (state) => !!state.token
    },

    actions: {
        async login(loginData: LoginRequest) {
            const { data } = await apiClient.post<AuthResponse>(import.meta.env.VITE_API_LOGIN, loginData)

            this.token = data.token;
            this.user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                points: data.points,
                role: data.role
            }
            localStorage.setItem('token', data.token);
        },

        async register(registerData: CreateUserRequest) {
            const { data } = await apiClient.post<AuthResponse>(import.meta.env.VITE_API_REGISTER, registerData);

            this.token = data.token;
            this.user = {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                points: data.points,
                role: data.role
            }
            localStorage.setItem('token', data.token);
        },

        async fetchUser() {
            try {
                const { data } = await apiClient.get<User>(import.meta.env.VITE_API_USER_INFO);
                this.user = data;
                console.log('User fetched:', this.user);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            router.push('/');
        }
    }
})