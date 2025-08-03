import { createRouter, createWebHistory } from 'vue-router'

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
        }
    ]
})

export default router
