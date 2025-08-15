<template>
    <div id="app" class="h-screen flex flex-col bg-brand-background text-brand-text">
        <NavBar />
        <main class="flex-1 overflow-y-auto">
            <Transition name="fade" mode="out-in">
                <router-view />
            </Transition>
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import NavBar from '@/components/NavBar.vue'

const authStore = useAuthStore()

onMounted(() => {
    if (authStore.token && !authStore.user) {
        authStore.fetchUser()
    }
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>