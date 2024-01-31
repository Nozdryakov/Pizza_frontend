import './assets/scss/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/fonts/Inter-font.css';
import './assets/fonts/Raleway-font.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);


app
  .use(router)
  .mount('#app');
