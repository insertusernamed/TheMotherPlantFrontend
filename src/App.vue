<template>
    <div id="app">
        <NavBar />
        <router-view />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NavBar from '@/components/NavBar.vue'

const authStore = useAuthStore()

onMounted(() => {
    // Only fetch user if we have a token but no user data
    if (authStore.token && !authStore.user) {
        authStore.fetchUser()
    }
});
</script>

<style scoped>
#app {
    min-height: 100vh;
}
</style>
