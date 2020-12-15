import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from './utils/server'
import Plugin from './utils/plugin'

Vue.config.productionTip = false
Vue.use(Plugin)

makeServer()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
