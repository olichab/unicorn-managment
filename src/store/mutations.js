import { createAllPairs } from '../utils/helpers'

const mutations = {
  SET_THEME(state) {
    localStorage.setItem('theme', state.theme)
    document.documentElement.setAttribute('data-theme', state.theme)
  },
  TOGGLE_THEME(state) {
    state.theme = state.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
    document.documentElement.setAttribute('data-theme', state.theme)
    localStorage.setItem('theme', state.theme)
  },
  SET_UNICORNS_LIST(state, unicornsList) {
    state.unicornsList = unicornsList
  },
  ADD_UNICORNS_LIST(state, unicorn) {
    state.unicornsList = [...state.unicornsList, unicorn]
  },
  TOGGLE_SHOW_OPTIONS(state) {
    state.showOptionsAddUnicorn = !state.showOptionsAddUnicorn
  },
  SELECT_OPTION_MERGE(state) {
    state.unicornsToMerge = []
    state.selectionOptionMerge = !state.selectionOptionMerge
  },
  SELECT_OPTION_BY_COLOR(state) {
    state.selectionOptionByColor = !state.selectionOptionByColor
  },
  RESET_OPTION_MERGE(state) {
    window.scrollTo(0, 0)
    state.selectionOptionMerge = false
    state.unicornsToMerge = []
  },
  RESET_OPTION_BY_COLOR(state) {
    window.scrollTo(0, 0)
    state.selectionOptionByColor = false
    state.unicornsByPair = []
    state.selectedColors = {}
  },
  SET_CARDS_TO_MERGE(state, selectedUnicorn) {
    const MAX_CARDS_SELECTION = 2
    const length = state.unicornsToMerge.length
    const unicornExist = state.unicornsToMerge.includes(selectedUnicorn)
    if (!unicornExist && length < MAX_CARDS_SELECTION) {
      state.unicornsToMerge = [...state.unicornsToMerge, selectedUnicorn]
    } else if (unicornExist) {
      state.unicornsToMerge = state.unicornsToMerge.filter(
        (unicorn) => unicorn.id !== selectedUnicorn.id
      )
    }
  },
  SET_COLORS_UNICORNS_TO_MERGE(state, colors) {
    state.colorsUnicornsToMerge = colors
      .map((unicorn) => unicorn.details)
      .reduce(
        (acc, characteristics) => {
          Object.entries(characteristics).map((characteristic) => {
            const key = `${characteristic[0]}`
            const value = characteristic[1]
            return !acc[key].includes(value)
              ? (acc[key] = [...acc[key], value])
              : null
          })
          return acc
        },
        {
          mane: [],
          tail: [],
          fur: [],
          horn: []
        }
      )
  },
  SET_CARDS_BY_PAIR(state) {
    // Compare colors for each characteristic to calculate chance percent
    let idPair = 0
    state.pairsWithProbability = []
    createAllPairs(state.unicornsList).map((pair) => {
      let probability = 1
      pair.map((unicorn, i, arr) => {
        if (i === 0) {
          Object.entries(unicorn.details).map((detail) => {
            const colorFirstElementPair = detail[1]
            const colorSecondElementPair = arr[i + 1].details[detail[0]]
            const colorSelected = state.selectedColors[detail[0]]
            if (
              colorFirstElementPair !== colorSecondElementPair &&
              (colorFirstElementPair === colorSelected ||
                colorSecondElementPair === colorSelected)
            ) {
              probability *= 0.5
            } else if (
              colorFirstElementPair !== colorSelected &&
              colorSecondElementPair !== colorSelected
            ) {
              probability *= 0
            }
          })
        }
      })
      state.pairsWithProbability = [
        ...state.pairsWithProbability,
        {
          idPair: idPair,
          probabilityPercent: probability * 100,
          unicorns: pair
        }
      ]
      idPair++
    })
  },
  SELECT_COLOR(state, colors) {
    const [label, color] = colors
    state.selectedColors = { ...state.selectedColors, [label]: color }
  },
  FIND_ALL_UNICORN_POSSIBILITIES(state, colors) {
    let idPossibility = 0
    colors
      // Recover all colors pairs
      .reduce(
        (acc, unicorn, i) => {
          Object.values(unicorn.details).map((color, i) =>
            !acc[i].includes(color) ? (acc[i] = [...acc[i], color]) : null
          )
          return acc
        },
        [[], [], [], []]
      )
      // Find all combinations
      .reduce(
        (acc, val, i, arr) =>
          acc.flatMap((x) =>
            val.map((y) => {
              if (i === arr.length - 1) {
                state.unicornPossibilities = [
                  ...state.unicornPossibilities,
                  {
                    id: idPossibility,
                    details: {
                      mane: x[0],
                      tail: x[1],
                      fur: x[2],
                      horn: y
                    }
                  }
                ]
                idPossibility++
              }
              return [...x, y]
            })
          ),
        ['']
      )
  },
  RESET_UNICORN_POSSIBILITIES(state) {
    state.unicornPossibilities = []
  }
}

export default mutations
