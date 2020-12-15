import axios from 'axios'
const Unicorns = {}

Unicorns.install = function (Vue, options) {
  Vue.prototype.$axios = axios
}

export default Unicorns
