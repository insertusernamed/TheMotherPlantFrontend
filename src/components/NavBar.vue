<template>
    <nav class="bg-brand-background border-b border-brand-tan/50 font-sans text-brand-text shadow-sm">
        <div class="container mx-auto flex items-center justify-between px-6 py-4">

            <router-link to="/"
                class="font-serif text-2xl font-bold text-brand-heading hover:text-brand-forest transition-colors">
                The Mother Plant
            </router-link>

            <div class="hidden md:flex items-center space-x-5 md:space-x-6">
                <router-link to="/shop" class="text-lg hover:text-brand-forest transition-colors">Shop</router-link>

                <div v-if="authStore.isLoggedIn" class="flex items-center space-x-4">
                    <router-link to="/admin" v-if="authStore.user?.role === 'ADMIN'"
                        class="text-lg hover:text-brand-forest transition-colors">
                        Admin
                    </router-link>
                    <button @click="authStore.logout" class="text-lg hover:text-brand-forest transition-colors">
                        Logout
                    </button>
                </div>
            </div>

            <button @click="toggleMobileMenu" class="md:hidden flex justify-center items-center w-12 h-12 p-2">
                <div class="relative w-6 h-6">
                    <span
                        class="block w-5 h-0.5 bg-brand-text absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                        :class="{ 'rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen, 'top-2 -translate-y-1/2': !isMobileMenuOpen }"></span>

                    <span
                        class="block w-5 h-0.5 bg-brand-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                        :class="{ 'opacity-0': isMobileMenuOpen }"></span>

                    <span
                        class="block w-5 h-0.5 bg-brand-text absolute left-1/2 -translate-x-1/2 transition-all duration-300"
                        :class="{ '-rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen, 'top-4 -translate-y-1/2': !isMobileMenuOpen }"></span>
                </div>
            </button>
        </div>

        <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
            :class="{ 'max-h-96 opacity-100': isMobileMenuOpen, 'max-h-0 opacity-0': !isMobileMenuOpen }">
            <div class="bg-brand-background border-t border-brand-tan/50">
                <div class="px-6 py-4 space-y-4">
                    <router-link to="/shop" @click="closeMobileMenu"
                        class="block text-lg hover:text-brand-forest transition-colors">Shop</router-link>

                    <div v-if="authStore.isLoggedIn" class="space-y-4 pt-2 border-t border-brand-tan/30">
                        <router-link to="/admin" v-if="authStore.user?.role === 'ADMIN'" @click="closeMobileMenu"
                            class="block text-lg hover:text-brand-forest transition-colors">
                            Admin
                        </router-link>
                        <button @click="handleMobileLogout"
                            class="block text-lg hover:text-brand-forest transition-colors text-left">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const handleMobileLogout = () => {
    authStore.logout()
    closeMobileMenu()
}
</script>