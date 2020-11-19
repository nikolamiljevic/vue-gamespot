import Vue from 'vue'
import App from './App.vue'
import router from './routes'

import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdCard)

import Button from './components/ui/Button.vue'
Vue.component('app-button',Button)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
