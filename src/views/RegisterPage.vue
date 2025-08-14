<template>
    <div class="bg-brand-background h-full flex items-center justify-center p-4 font-sans">

        <div class="w-full max-w-lg bg-white/50 rounded-xl shadow-2xl p-8">

            <div class="text-center mb-8">
                <h1 class="font-serif text-4xl font-bold text-brand-heading">Create Your Account</h1>
                <p class="text-brand-text/90 mt-2">Join our community of plant lovers.</p>
            </div>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label for="firstName" class="block text-lg font-semibold text-brand-text mb-2">First
                            Name</label>
                        <input id="firstName" v-model="registerForm.firstName" type="text" required placeholder="Jane"
                            class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                    </div>
                    <div>
                        <label for="lastName" class="block text-lg font-semibold text-brand-text mb-2">Last Name</label>
                        <input id="lastName" v-model="registerForm.lastName" type="text" required placeholder="Doe"
                            class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-lg font-semibold text-brand-text mb-2">Email</label>
                    <input id="email" v-model="registerForm.email" type="email" required placeholder="you@example.com"
                        class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                </div>

                <div>
                    <label for="password" class="block text-lg font-semibold text-brand-text mb-2">Password</label>
                    <input id="password" v-model="registerForm.password" type="password" required placeholder="••••••••"
                        class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                </div>

                <div>
                    <label for="confirmPassword" class="block text-lg font-semibold text-brand-text mb-2">Confirm
                        Password</label>
                    <input id="confirmPassword" v-model="registerForm.confirmPassword" type="password" required
                        placeholder="••••••••"
                        class="w-full px-4 py-3 bg-white/80 border border-brand-tan rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-sage transition">
                </div>

                <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md !mt-6">
                    <p>{{ error }}</p>
                </div>

                <button type="submit" :disabled="loading"
                    class="w-full bg-brand-button text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-brand-button-hover transition-all transform hover:-translate-y-1 disabled:bg-brand-sage disabled:cursor-not-allowed disabled:transform-none !mt-6">
                    {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
            </form>

            <div class="text-center mt-6 text-brand-text/90">
                <p>
                    Already have an account?
                    <router-link to="/login" class="font-semibold text-brand-forest hover:underline">Login
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

const registerForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const handleRegister = async () => {
    if (!registerForm.firstName || !registerForm.lastName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
        error.value = 'Please fill in all fields.'
        return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
        error.value = 'Passwords do not match.'
        return
    }
    if (registerForm.password.length < 6) {
        error.value = 'Password must be at least 6 characters long.'
        return
    }

    loading.value = true
    error.value = ''

    try {
        await authStore.register({
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            email: registerForm.email,
            password: registerForm.password
        })
        router.push('/')
    } catch (err: any) {
        error.value = err.message || 'Registration failed. The email might already be in use.'
    } finally {
        loading.value = false
    }
}
</script>