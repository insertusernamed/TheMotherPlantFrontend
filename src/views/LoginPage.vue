<template>
    <div class="bg-brand-background h-full flex items-center justify-center p-4 font-sans">

        <div class="w-full max-w-md bg-white/50 rounded-xl shadow-2xl p-8">

            <div class="text-center mb-8">
                <h1 class="font-serif text-4xl font-bold text-brand-heading">Welcome Back</h1>
                <p class="text-brand-text/90 mt-2">Please sign in to your account.</p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
                <div>
                    <label for="email" class="block text-lg font-semibold text-brand-text mb-2">Email</label>
                    <input id="email" v-model="loginForm.email" type="email" required placeholder="you@example.com"
                        class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                </div>

                <div>
                    <label for="password" class="block text-lg font-semibold text-brand-text mb-2">Password</label>
                    <input id="password" v-model="loginForm.password" type="password" required placeholder="••••••••"
                        class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                </div>

                <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
                    <p>{{ error }}</p>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full bg-brand-button text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-button-hover transition-all transform hover:-translate-y-1 disabled:bg-brand-sage disabled:cursor-not-allowed disabled:transform-none">
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>
            </form>

            <div class="text-center mt-6 text-brand-text/90">
                <p>
                    Don't have an account?
                    <router-link to="/register" class="font-semibold text-brand-forest hover:underline">Register
                        here</router-link>
                </p>
                <p class="mt-2">
                    <router-link to="/" class="text-sm hover:underline">Back to Home</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const loginForm = reactive({
    email: '',
    password: ''
})

const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
        error.value = 'Please fill in all fields.'
        return
    }

    loading.value = true
    error.value = ''

    try {
        await authStore.login({
            email: loginForm.email,
            password: loginForm.password
        })
        router.push('/')
    } catch (err) {
        error.value = 'Login failed. Please check your email and password.'
    } finally {
        loading.value = false
    }
}
</script>