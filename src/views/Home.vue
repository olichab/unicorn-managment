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
        @click.native="selectOptionMerge()"
        :title="'Merge'"
        :text="'Select two unicorns to merge them together'"
        :logo="'merge'"
        :class="['button-creation', { active: selectionOptionMerge }]"
      ></ButtonOptionAddUnicorn>
      <ButtonOptionAddUnicorn
        @click.native="selectOptionByColor()"
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
        @click.native="setCardsByPair()"
        :colors="Object.values(colors)[0]"
        :label="Object.keys(colors)[0]"
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
    <div class="list-unicorns-by-pair" v-else-if="showListUnicornsByPair">
      <div
        v-for="pair in sortedUnicornsListByPair"
        :key="pair.idPair"
        class="pair"
      >
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
          @click.native="postUnicornWithRandomColors(pair.unicorns)"
          class="button"
          :label="'Create'"
          :iconButton="'plus'"
        ></Button>
      </div>
    </div>
    <Toast v-if="showToast" :unicorns="unicornsToMerge"></Toast>
    <ModalNewUnicorn
      name="new-unicorn-modal"
      :unicorns="unicornsToMerge"
    ></ModalNewUnicorn>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Button from '../components/Button'
import Card from '../components/Card'
import ButtonGroupColors from '../components/ButtonGroupColors'
import ButtonOptionAddUnicorn from '../components/ButtonOptionAddUnicorn'
import Toast from '../components/Toast'
import ModalNewUnicorn from '../components/ModalNewUnicorn'

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
  computed: {
    ...mapGetters([
      'reversedUnicornsList',
      'showToast',
      'showListUnicornsByPair',
      'sortedUnicornsListByPair'
    ]),
    ...mapState([
      'unicornsList',
      'unicornsToMerge',
      'selectedColors',
      'showOptionsAddUnicorn',
      'selectionOptionByColor',
      'selectionOptionMerge',
      'colorsCharacteristics'
    ])
  },
  mounted() {
    this.getUnicornsList()
  },
  methods: {
    ...mapActions([
      'getUnicornsList',
      'postUnicorn',
      'postUnicornWithRandomColors',
      'selectOptionMerge',
      'selectOptionByColor',
      'resetAllOpions',
      'setCardsToMerge',
      'setCardsByPair'
    ])
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
