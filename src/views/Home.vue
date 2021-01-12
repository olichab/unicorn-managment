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
      <div v-for="pair in unicornsByPair" :key="pair.id" class="pair">
        <h4 class="percent">
          Chance of success :
          {{
            calculatePercentChance(
              pair[0].nbCorrespondenceColor,
              pair[1].nbCorrespondenceColor
            )
          }}
          %
        </h4>
        <div v-for="unicorn in pair" :key="unicorn.id" class="card-pair">
          <Card :infosUnicorn="unicorn"></Card>
        </div>
        <Button
          @click.native="postUnicorn(pair)"
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
import axios from 'axios'
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
    postUnicorn: function(unicorns) {
      let unicornToPost = {}
      const randomize = (arr) => arr[Math.floor(Math.random() * arr.length)]
      if (Array.isArray(unicorns)) {
        unicornToPost = unicorns
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
      } else {
        unicornToPost = unicorns
      }

      axios
        .post('/api/unicorn', unicornToPost.details)
        .then((response) => this.unicornsList.push(response.data.unicorn))
        .catch((error) => {
          console.error('Error post unicorn:', error)
        })
      this.resetAllOpions()
    },
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
    openModal: function() {
      this.$modal.show('new-unicorn-modal')
    },
    calculatePercentChance: function(n1, n2) {
      return ((n1 + n2) * 100) / 8
    },
    setCardsToMerge: function(unicornToAdd) {
      const MAX_CARDS_SELECTION = 2
      const length = this.unicornsToMerge.length
      const unicornExist = this.unicornsToMerge.includes(unicornToAdd)
      if (!unicornExist && length < MAX_CARDS_SELECTION) {
        this.unicornsToMerge.push(unicornToAdd)
      } else if (unicornExist) {
        this.unicornsToMerge = this.unicornsToMerge.filter(
          (unicorn) => unicorn.id !== unicornToAdd.id
        )
      }
    },
    setCardsByPair: function(color) {
      const MAX_COLORS_SELECTION = 4
      this.unicornsByPair = this.unicornsList
      Object.assign(this.selectedColors, color)
      Object.keys(this.selectedColors).length === MAX_COLORS_SELECTION
        ? (this.showListUnicornsByPair = true)
        : (this.showListUnicornsByPair = false)
      // If all colors characteristics are selected add nb correspondence witch colors selected
      if (this.showListUnicornsByPair) {
        this.unicornsByPair.map((unicorn) => {
          unicorn.nbCorrespondenceColor = 0
          Object.keys(unicorn.details).map((characteristic) => {
            if (
              unicorn.details[characteristic] ===
              this.selectedColors[characteristic]
            ) {
              typeof unicorn.nbCorrespondenceColor === 'undefined'
                ? (unicorn.nbCorrespondenceColor = 1)
                : unicorn.nbCorrespondenceColor++
            }
          })
        })
        // Sort by nbCorrespondenceColor desc
        this.unicornsByPair.sort(
          (a, b) => b.nbCorrespondenceColor - a.nbCorrespondenceColor
        )
        // Create array of pairs
        const pairs = []
        for (let i = 0; i < this.unicornsByPair.length; i += 2) {
          if (this.unicornsByPair[i + 1]) {
            pairs.push([this.unicornsByPair[i], this.unicornsByPair[i + 1]])
          }
        }
        this.unicornsByPair = pairs
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
