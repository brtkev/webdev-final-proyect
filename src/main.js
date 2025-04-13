import './assets/main.css'
import "@fortawesome/fontawesome-free/js/all.js";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/database/firebase.js';

/** TOOLTIP */
// https://github.com/maciejziemichod/v-tooltip/blob/main/README.md
import tooltip from "./directives/tooltip.js";
import "@/assets/tooltip.css";


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components,
    directives,
})


const app = createApp(App)

app.use(router)

app.use(vuetify)

app.directive("tooltip", tooltip);

app.mount('#app')
