import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import { maneColors, tailColors, hornColors, furColors } from '../utils/config'
import { calculatePercentage } from '../utils/helpers'

Vue.use(Vuex)

const state = {
  theme: localStorage.getItem('theme') || 'lightTheme',
  unicornsList: [],
  unicornsToMerge: [],
  colorsUnicornsToMerge: {},
  selectedColors: {},
  unicornsByPair: [],
  unicornPossibilities: [],
  pairsWithProbability: [],
  colorsCharacteristics: [
    { mane: maneColors },
    { tail: tailColors },
    { fur: furColors },
    { horn: hornColors }
  ],
  showOptionsAddUnicorn: false,
  selectionOptionByColor: false,
  selectionOptionMerge: false
}

const getters = {
  reversedUnicornsList: (state) =>
    [...state.unicornsList].sort((a, b) => b.id - a.id),
  showToast: (state) => state.unicornsToMerge.length > 1,
  showListUnicornsByPair: (state) => {
    const MAX_COLORS_SELECTION = 4
    return Object.entries(state.selectedColors).length === MAX_COLORS_SELECTION
  },
  sortedUnicornsListByPair: (state) =>
    [...state.pairsWithProbability].sort(
      (a, b) => b.probabilityPercent - a.probabilityPercent
    ),
  percentColorsMerge: (state) => (colors) => calculatePercentage(colors)
}

export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters
})
