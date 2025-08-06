<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/shop">Shop</router-link> |
        <template v-if="!authStore.isLoggedIn">
            <router-link to="/login">Login</router-link>
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

<style scoped>
nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
}

nav a {
    text-decoration: none;
    color: #333;
}

nav a:hover {
    text-decoration: underline;
}

nav button {
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    font-size: inherit;
    text-decoration: underline;
}

nav button:hover {
    color: #666;
}
</style>
