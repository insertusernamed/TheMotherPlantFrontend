<template>
    <footer class="bg-brand-background border-t border-brand-tan/50 font-sans text-brand-text text-sm">
        <div class="container mx-auto px-6 py-4">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">

                <div class="text-center md:text-left text-brand-text/70">
                    &copy; 2024 The Mother Plant. All rights reserved.
                    <template v-if="!authStore.isLoggedIn">
                        <span class="mx-2">•</span>
                        <router-link to="/login" class="hover:text-brand-forest transition-colors">
                            Site owner?
                        </router-link>
                    </template>
                </div>

                <div v-if="authStore.isLoggedIn" class="flex items-center gap-4">
                    <router-link to="/admin" v-if="authStore.user?.role === 'ADMIN'"
                        class="hover:text-brand-forest transition-colors">
                        Admin Panel
                    </router-link>
                    <button @click="authStore.logout"
                        class="text-brand-text/70 hover:text-brand-forest transition-colors">
                        Logout
                    </button>
                </div>

                <div class="text-center md:text-right">
                    <button @click="scrollToTop" class="hover:text-brand-forest transition-colors">
                        Back to Top &uarr;
                    </button>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>