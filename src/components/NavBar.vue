<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/shop">Shop</router-link> |
        <template v-if="!authStore.isLoggedIn">
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link>
        </template>
        <template v-else>
            <router-link to="/admin" v-if="authStore.user?.role === 'ADMIN'">Admin</router-link>
            <span v-if="authStore.user?.role === 'ADMIN'"> | </span>
            <button @click="authStore.logout">Logout</button>
        </template>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>
