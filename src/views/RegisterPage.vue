<template>
    <div>
        <h1>Register</h1>

        <form @submit.prevent="handleRegister">
            <div>
                <label for="firstName">First Name:</label>
                <input id="firstName" v-model="registerForm.firstName" type="text" required
                    placeholder="Enter your first name">
            </div>

            <div>
                <label for="lastName">Last Name:</label>
                <input id="lastName" v-model="registerForm.lastName" type="text" required
                    placeholder="Enter your last name">
            </div>

            <div>
                <label for="email">Email:</label>
                <input id="email" v-model="registerForm.email" type="email" required placeholder="Enter your email">
            </div>

            <div>
                <label for="password">Password:</label>
                <input id="password" v-model="registerForm.password" type="password" required
                    placeholder="Enter your password">
            </div>

            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input id="confirmPassword" v-model="registerForm.confirmPassword" type="password" required
                    placeholder="Confirm your password">
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? 'Creating Account...' : 'Register' }}
            </button>
        </form>

        <p>
            Already have an account?
            <router-link to="/login">Login here</router-link>
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

const registerForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const handleRegister = async () => {
    if (!registerForm.firstName || !registerForm.lastName || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
        error.value = 'Please fill in all fields'
        return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
        error.value = 'Passwords do not match'
        return
    }

    if (registerForm.password.length < 6) {
        error.value = 'Password must be at least 6 characters long'
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
    } catch (err) {
        error.value = 'Registration failed. Please try again.'
    } finally {
        loading.value = false
    }
}
</script>
