import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import FloatingVue from 'floating-vue'
import 'vue3-toastify/dist/index.css';
import 'floating-vue/dist/style.css'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(FloatingVue)
app.use(Vue3Toastify, {
    autoClose: 5000,
} as ToastContainerOptions);
app.mount('#app')
