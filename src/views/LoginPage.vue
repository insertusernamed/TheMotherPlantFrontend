<template>
    <div>
        <h1>Login</h1>

        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">Email:</label>
                <input id="email" v-model="loginForm.email" type="email" required placeholder="Enter your email">
            </div>

            <div>
                <label for="password">Password:</label>
                <input id="password" v-model="loginForm.password" type="password" required
                    placeholder="Enter your password">
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
            </button>
        </form>

        <p>
            Don't have an account?
            <router-link to="/register">Register here</router-link>
        </p>

        <p>
            <router-link to="/">Back to Home</router-link>
        </p>

        <div v-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

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
        error.value = 'Please fill in all fields'
        return
    }

    loading.value = true
    error.value = ''

    try {
        await authStore.login({
            email: loginForm.email,
            password: loginForm.password
        })
        console.log('Login completed, user in store:', authStore.user)
        router.push('/')
    } catch (err) {
        error.value = 'Login failed. Please check your credentials.'
    } finally {
        loading.value = false
    }
}
</script>
