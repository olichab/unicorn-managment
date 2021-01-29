import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { makeServer } from './utils/server'
import Plugin from './utils/plugin'
import VModal from 'vue-js-modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus,
  faBan,
  faSyncAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false
Vue.use(Plugin)
Vue.use(VModal)
library.add(faPlus, faBan, faSyncAlt, faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

makeServer()

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
