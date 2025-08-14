<template>
    <div class="bg-brand-background min-h-screen p-8 text-brand-text">
        <header class="text-center mb-12">
            <h1 class="text-5xl font-bold text-brand-heading mb-4">Welcome to The Mother Plant</h1>
            <p class="text-xl">Nurturing Greenery, One Plant at a Time.</p>
        </header>

        <div v-if="!authStore.isLoggedIn" class="text-center">
            <p class="mb-4">login text</p>
        </div>

        <div v-else class="text-center">
            <p class="text-lg mb-2">Welcome back, <span class="font-semibold text-brand-forest">{{ userInfo?.firstName
                    }} {{ userInfo?.lastName }}</span>!</p>
            <p class="mb-2">You have <span class="font-semibold text-brand-forest">{{ userInfo?.points }}</span> points
                to spend.</p>
            <p class="text-sm">Your role: {{ userInfo?.role }}</p>
        </div>

        <main class="mt-16">
            <section class="text-center">
                <h2 class="text-3xl font-bold text-brand-heading mb-6">Our Newest Additions</h2>
                <p>plants here</p>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const userInfo = computed(() => authStore.user)
</script>