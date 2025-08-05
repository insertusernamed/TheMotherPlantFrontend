import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomePage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/RegisterPage.vue')
        },
        {
            path: '/shop',
            name: 'shop',
            component: () => import('@/views/ShopPage.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/AdminPage.vue'),
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore()
                if (authStore.user?.role === 'ADMIN') {
                    next()
                } else {
                    next('/')
                }
            }
        }
    ]
})

export default router
