import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import HomePage from '@/views/HomePage.vue'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import ShopPage from '@/views/ShopPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterPage
        },
        {
            path: '/shop',
            name: 'shop',
            component: ShopPage
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/views/AdminPage.vue'),
            beforeEnter: (_to, _from, next) => {
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