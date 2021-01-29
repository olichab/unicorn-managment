import axios from 'axios'
import { randomize } from '../utils/helpers'

const actions = {
  setTheme({ commit }) {
    commit('SET_THEME')
  },
  toggleTheme({ commit }) {
    commit('TOGGLE_THEME')
  },
  getUnicornsList({ commit }) {
    axios
      .get('/api/unicorns')
      .then((response) => commit('SET_UNICORNS_LIST', response.data.unicorns))
  },
  postUnicorn({ commit, dispatch }, unicorn) {
    axios
      .post('/api/unicorn', unicorn.details)
      .then((response) => {
        commit('ADD_UNICORNS_LIST', response.data.unicorn)
        dispatch('resetAllOpions')
      })
      .catch((error) => {
        console.error('Error post unicorn:', error)
      })
    commit('RESET_UNICORN_POSSIBILITIES')
  },
  postUnicornWithRandomColors({ commit, dispatch }, unicorns) {
    const formattedUnicorn = unicorns
      .map((unicorn) => unicorn.details)
      .reduce((acc, val, i, arr) => {
        if (i === arr.length - 1) {
          return {
            details: {
              mane: randomize([val.mane, arr[i - 1].mane]),
              tail: randomize([val.tail, arr[i - 1].tail]),
              fur: randomize([val.fur, arr[i - 1].fur]),
              horn: randomize([val.horn, arr[i - 1].horn])
            }
          }
        }
      }, {})
    dispatch('postUnicorn', formattedUnicorn)
  },
  selectOptionMerge({ commit }) {
    commit('SELECT_OPTION_MERGE')
    commit('RESET_OPTION_BY_COLOR')
  },
  selectOptionByColor({ commit }) {
    commit('SELECT_OPTION_BY_COLOR')
    commit('RESET_OPTION_MERGE')
  },
  resetOptionMerge({ commit, dispatch }) {
    commit('RESET_OPTION_MERGE')
  },
  resetOptionByColor({ commit }) {
    commit('RESET_OPTION_BY_COLOR')
  },
  resetAllOpions({ commit }) {
    commit('TOGGLE_SHOW_OPTIONS')
    commit('RESET_OPTION_MERGE')
    commit('RESET_OPTION_BY_COLOR')
  },
  showModal({ commit }, modal) {
    modal.show('new-unicorn-modal')
  },
  hideModal({ commit }, modal) {
    modal.hide('new-unicorn-modal')
    commit('RESET_UNICORN_POSSIBILITIES')
  },
  setCardsToMerge({ commit }, unicorn) {
    commit('SET_CARDS_TO_MERGE', unicorn)
  },
  setColorsUnicornsToMerge({ commit }, unicorns) {
    commit('SET_COLORS_UNICORNS_TO_MERGE', unicorns)
  },
  findAllUnicornPossibilities({ commit }, unicorns) {
    commit('FIND_ALL_UNICORN_POSSIBILITIES', unicorns)
  },
  selectColor({ commit }, colors) {
    commit('SELECT_COLOR', colors)
  },
  setCardsByPair({ commit, state, getters }) {
    if (getters.showListUnicornsByPair) {
      commit('SET_CARDS_BY_PAIR')
    }
  }
}

export default actions
