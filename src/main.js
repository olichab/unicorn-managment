import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from './utils/server'
import Plugin from './utils/plugin'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faBan,
  faSyncAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faBan, faSyncAlt, faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Plugin)

makeServer()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
