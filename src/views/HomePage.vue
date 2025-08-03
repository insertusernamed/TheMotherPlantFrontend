<template>
    <div>
        <h1>Welcome to The Mother Plant</h1>
        <p>Your homepage content goes here.</p>

        <div v-if="!authStore.isLoggedIn">
            <p>Please log in to access all features.</p>
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link>
        </div>

        <div v-else>
            <p>Welcome back, {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}! Points: {{
                authStore.user?.points }}</p>
            <p>Your role: {{ authStore.user?.role }}</p>
            <button @click="authStore.logout">Logout</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
</script>
