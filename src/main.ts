import { createApp } from 'vue'
import 'echarts'
import ECharts from 'vue-echarts'

import DataVVue3 from '@kjgl77/datav-vue3'
import './style.scss'
import router from './router.js'
import App from './App.vue'

const app = createApp(App)
app.use(DataVVue3)
app.component('v-chart', ECharts)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'BIMGO'
  next()
})

app.use(router).mount('#app')