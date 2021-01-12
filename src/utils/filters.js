import Vue from 'vue'

Vue.filter(
  'uppercaseFirstLetter',
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
)
