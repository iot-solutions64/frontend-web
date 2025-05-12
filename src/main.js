import { createApp } from 'vue'
import './style.css'
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {definePreset} from "@primeuix/themes";
import store from "./shared/store/store.js";
import router from "./shared/router/index.js";
// PrimeVue components
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Card from 'primevue/card';
import IftaLabel from 'primevue/iftalabel';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import Chart from 'primevue/chart';
import Select from "primevue/select";
// PrimeVue services
import ToastService from 'primevue/toastservice';
// PrimeVue directives
import Tooltip from 'primevue/tooltip';

const blue = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        },
        colorScheme: {
            light: {
                primary: {
                    color: "{primary.500}",
                    contrastColor: "#ffffff",
                    hoverColor: "{primary.600}",
                    activeColor: "{primary.700}",
                },
                highlight: {
                    background: "{primary.50}",
                    focusBackground: "{primary.100}",
                    color: "{primary.700}",
                    focusColor: "{primary.800}",
                },
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                }
            }
        }
    }
});
const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: blue,
        options: {
            darkModeSelector: 'light',
        }
    }
});
app.use(store)
app.use(router)
app.component('pv-button', Button)
app.component('pv-menu', Menu)
app.component('pv-card', Card)
app.component('pv-ifta-label', IftaLabel)
app.component('pv-icon-field', IconField)
app.component('pv-input-icon', InputIcon)
app.component('pv-input-text', InputText)
app.component('pv-data-table', DataTable)
app.component('pv-column', Column)
app.component('pv-checkbox', Checkbox)
app.component('pv-dialog', Dialog)
app.component('pv-input-number', InputNumber)
app.component('pv-toast', Toast)
app.component('pv-chart', Chart)
app.component('pv-select', Select)
app.use(ToastService)
app.directive('tooltip', Tooltip);
app.mount('#app')
