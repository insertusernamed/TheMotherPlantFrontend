<template>
    <div>
        <h1>Welcome to The Mother Plant</h1>
        <p>Your homepage content goes here.</p>

        <div v-if="!authStore.isLoggedIn">
            <p>Please log in to access all features.</p>
        </div>

        <div v-else>
            <p>Welcome back, {{ userInfo?.firstName }} {{ userInfo?.lastName }}! Points: {{
                userInfo?.points }}</p>
            <p>Your role: {{ userInfo?.role }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const userInfo = computed(() => authStore.user)
</script>
