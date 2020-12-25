import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import VueResource from 'vue-resource'
import vuelidate from 'vuelidate'
import wysiwyg from 'vue-wysiwyg'

// vuex
import store from './store/store'


import { MdCard, MdButton, MdDialog, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdDialog)

Vue.use(MdContent)

import Button from './components/ui/Button.vue'
Vue.component('app-button',Button)

// resource
Vue.use(VueResource)
Vue.http.options.root = 'https://gamespot-69a38.firebaseio.com/'

Vue.use(vuelidate)
Vue.use(wysiwyg)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
