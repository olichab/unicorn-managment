<template>
  <div class="home">
    <div class="title-wrapper">
      <h1>The Magical World Of Unicorns</h1>
      <Button
        @click.native="resetAllOpions"
        :label="showOptionsAddUnicorn ? 'Cancel' : 'Add unicorn'"
        :iconButton="showOptionsAddUnicorn ? 'ban' : 'plus'"
      ></Button>
    </div>
    <div class="buttons-creation-wrapper" v-if="showOptionsAddUnicorn">
      <ButtonOptionAddUnicorn
        @click.native="selectCategory('merge')"
        :title="'Merge'"
        :text="'Select two unicorns to merge them together'"
        :logo="'merge'"
        :class="['button-creation', { active: selectionOptionMerge }]"
      ></ButtonOptionAddUnicorn>
      <ButtonOptionAddUnicorn
        @click.native="selectCategory('bycolor')"
        :title="'By Color'"
        :text="'Select a color for each characteristic'"
        :logo="'bycolor'"
        :class="['button-creation', { active: selectionOptionByColor }]"
      ></ButtonOptionAddUnicorn>
    </div>
    <div
      v-if="selectionOptionByColor === true"
      class="characteristics-colors-wrapper"
    >
      <ButtonGroupColors
        v-for="colors in colorsCharacteristics"
        :key="Object.keys(colors)[0]"
        :colors="Object.values(colors)[0]"
        :label="Object.keys(colors)[0]"
        @selectColor="setCardsByPair($event)"
      >
      </ButtonGroupColors>
    </div>
    <div class="list-unicorns" v-if="!selectionOptionByColor">
      <div v-for="unicorn in reversedUnicornsList" :key="unicorn.id">
        <Card
          @click.native="setCardsToMerge(unicorn)"
          :infosUnicorn="unicorn"
          :class="{
            active: selectionOptionMerge && unicornsToMerge.includes(unicorn)
          }"
          :style="[selectionOptionMerge && { cursor: 'pointer' }]"
        ></Card>
      </div>
    </div>
    <div class="list-unicorns-by-pair" v-else-if="this.showListUnicornsByPair">
      <div v-for="pair in unicornsByPair" :key="pair.idPair" class="pair">
        <h4 class="percent">
          Chance of success :
          {{ pair.probabilityPercent }}
          %
        </h4>
        <div
          v-for="unicorn in pair.unicorns"
          :key="unicorn.id"
          class="card-pair"
        >
          <Card :infosUnicorn="unicorn"></Card>
        </div>
        <Button
          @click.native="postUnicornMulti(pair.unicorns)"
          class="button"
          :label="'Create'"
          :iconButton="'plus'"
        ></Button>
      </div>
    </div>
    <Toast
      v-if="unicornsToMerge.length > 1"
      :unicorns="unicornsToMerge"
    ></Toast>
    <ModalNewUnicorn
      name="new-unicorn-modal"
      :unicorns="unicornsToMerge"
    ></ModalNewUnicorn>
  </div>
</template>

<script>
import Button from '../components/Button'
import Card from '../components/Card'
import ButtonGroupColors from '../components/ButtonGroupColors'
import ButtonOptionAddUnicorn from '../components/ButtonOptionAddUnicorn'
import Toast from '../components/Toast'
import ModalNewUnicorn from '../components/ModalNewUnicorn'
import { maneColors, tailColors, hornColors, furColors } from '../utils/config'

export default {
  name: 'Home',
  components: {
    Button,
    Card,
    ButtonGroupColors,
    ButtonOptionAddUnicorn,
    Toast,
    ModalNewUnicorn
  },
  data() {
    return {
      unicornsList: [],
      unicornsToMerge: [],
      selectedColors: {},
      unicornsByPair: [],
      colorsCharacteristics: [
        { mane: maneColors },
        { tail: tailColors },
        { fur: furColors },
        { horn: hornColors }
      ],
      showOptionsAddUnicorn: false,
      selectionOptionByColor: false,
      selectionOptionMerge: false,
      showListUnicornsByPair: false
    }
  },
  computed: {
    reversedUnicornsList: function() {
      return this.unicornsList.map((u) => u).sort((a, b) => b.id - a.id)
    }
  },
  mounted() {
    this.$axios.get('/api/unicorns').then((response) => {
      this.unicornsList = response.data.unicorns
    })
  },
  methods: {
    postUnicornSimple: function(unicorn) {
      this.$axios
        .post('/api/unicorn', unicorn.details)
        .then((response) => this.unicornsList.push(response.data.unicorn))
        .catch((error) => {
          console.error('Error post unicorn:', error)
        })
      this.resetAllOpions()
    },
    postUnicornMulti: function(unicorns) {
      console.log('unicorns', unicorns)
      let unicorn = {}
      unicorn = unicorns
        .map((unicorn) => unicorn.details)
        .reduce((acc, val, i, arr) => {
          if (i === arr.length - 1) {
            return {
              details: {
                mane: this.randomize([val.mane, arr[i - 1].mane]),
                tail: this.randomize([val.tail, arr[i - 1].tail]),
                fur: this.randomize([val.fur, arr[i - 1].fur]),
                horn: this.randomize([val.horn, arr[i - 1].horn])
              }
            }
          }
        }, {})

      this.$axios
        .post('/api/unicorn', unicorn.details)
        .then((response) => this.unicornsList.push(response.data.unicorn))
        .catch((error) => {
          console.error('Error post unicorn:', error)
        })
      this.resetAllOpions()
    },
    openModal: function() {
      this.$modal.show('new-unicorn-modal')
    },
    randomize: (arr) => arr[Math.floor(Math.random() * arr.length)],
    createAllPairs: (arr) =>
      arr.map((x, i) => arr.slice(i + 1).map((y) => [x, y])).flat(),
    selectCategory: function(type) {
      if (type === 'merge') {
        this.unicornsToMerge = []
        this.selectionOptionMerge = !this.selectionOptionMerge
        this.resetOptionByColor()
      } else if (type === 'bycolor') {
        this.selectionOptionByColor = !this.selectionOptionByColor
        this.resetOptionMerge()
      }
    },
    setCardsToMerge: function(unicornToAdd) {
      const MAX_CARDS_SELECTION = 2
      const length = this.unicornsToMerge.length
      const unicornExist = this.unicornsToMerge.includes(unicornToAdd)
      if (
        this.selectionOptionMerge &&
        !unicornExist &&
        length < MAX_CARDS_SELECTION
      ) {
        this.unicornsToMerge.push(unicornToAdd)
      } else if (unicornExist) {
        this.unicornsToMerge = this.unicornsToMerge.filter(
          (unicorn) => unicorn.id !== unicornToAdd.id
        )
      }
    },
    setCardsByPair: function(color) {
      const MAX_COLORS_SELECTION = 4
      Object.assign(this.selectedColors, color)
      this.showListUnicornsByPair =
        Object.entries(this.selectedColors).length === MAX_COLORS_SELECTION
      // Create pairs and compare colors for each characteristic to calculate chance percent
      if (this.showListUnicornsByPair) {
        const pairs = this.createAllPairs(this.unicornsList)
        const pairsWithProbability = []
        let idPair = 0
        pairs.map((pair) => {
          let probability = 1
          pair.map((unicorn, i, arr) => {
            if (i === 0) {
              Object.entries(unicorn.details).map((detail) => {
                const colorFirstElementPair = detail[1]
                const colorSecondElementPair = arr[i + 1].details[detail[0]]
                const colorSelected = this.selectedColors[detail[0]]
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
          pairsWithProbability.push({
            idPair: idPair,
            probabilityPercent: probability * 100,
            unicorns: pair
          })
          idPair++
        })
        // Sort by chance percent desc
        this.unicornsByPair = pairsWithProbability.sort(
          (a, b) => b.probabilityPercent - a.probabilityPercent
        )
      }
    },
    resetOptionMerge: function() {
      window.scrollTo(0, 0)
      this.selectionOptionMerge = false
      this.unicornsToMerge = []
      this.$modal.hide('new-unicorn-modal')
    },
    resetOptionByColor: function() {
      window.scrollTo(0, 0)
      this.selectionOptionByColor = false
      this.unicornsByPair = []
      this.selectedColors = {}
    },
    resetAllOpions: function() {
      this.showOptionsAddUnicorn = !this.showOptionsAddUnicorn
      this.resetOptionMerge()
      this.resetOptionByColor()
    }
  }
}
</script>

<style lang="less">
@import '../utils/less/colors.less';
@import '../utils/less/mediaQueries.less';
.home {
  padding: 1rem 1rem 15rem 1rem;
  @media @tablet {
    padding: 3rem 3rem 15rem 3rem;
  }
  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media @tablet {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
  .buttons-creation-wrapper {
    display: flex;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    .button-creation {
      &:hover {
        border: solid 2px @dark-blue;
      }
    }
    .active {
      border: solid 2px @dark-blue;
    }
  }
  .buttons-action-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    @media @tablet {
      justify-content: flex-end;
    }
  }
  .characteristics-colors-wrapper {
    display: grid;
    justify-items: center;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    padding: 1.5rem;
    @media @tablet {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
    }
  }

  .list-unicorns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    @media @tablet {
      grid-gap: 3rem;
    }
    @media @desktop {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 2rem;
    }
    .active {
      border: solid 2px @dark-blue;
    }
  }
  .list-unicorns-by-pair {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 1rem;
    @media @desktop {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2rem;
    }
    .pair {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(auto-fill, 1fr);
      grid-gap: 1rem;
      grid-template-areas:
        'p p'
        'c d'
        'b b';
      padding: 1rem;
      border: solid 1px @very-light-grey;
      border-radius: 0.5rem;
      .percent {
        grid-area: p;
      }
      .card-pair:nth-child(even) {
        grid-area: c;
      }
      .card-pair:nth-child(odd) {
        grid-area: d;
      }
      .button {
        grid-area: b;
        margin: auto;
      }
    }
  }
}
</style>
