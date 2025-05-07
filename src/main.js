import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import store from "./shared/store/store.js";
import router from "./shared/router/index.js";

const app = createApp(App)
app.use(PrimeVue, {
    ripple: true
})
app.use(store)
app.use(router)
app.mount('#app')
