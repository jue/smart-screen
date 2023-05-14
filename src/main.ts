import { createApp } from 'vue'
import 'echarts'
import ECharts from 'vue-echarts'

import DataVVue3 from '@kjgl77/datav-vue3'
import './style.scss'
import router from './router.js'
import App from './App.vue'

createApp(App).use(DataVVue3).component('v-chart', ECharts).use(router).mount('#app')
