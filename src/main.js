import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/fonts/Inter-font.css'
import './assets/fonts/Raleway-font.css'

import App from './App.vue'
import router from './router'
import { useCard } from '@/stores/CardStore.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
const Card = useCard()
pinia.use(Card)
app.use(router).mount('#app')
