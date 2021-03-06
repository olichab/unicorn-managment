<template>
  <div class="toast">
    <ul>
      <li v-for="(colors, characteristic, i) in colorsUnicornsToMerge" :key="i">
        <h5 class="characteristic">
          {{ characteristic | uppercaseFirstLetter }}
        </h5>
        <h5 v-for="(color, i) in colors" :key="i">
          {{ color | uppercaseFirstLetter }}
          <span
            class="preview-color"
            :style="[
              color === 'white'
                ? { 'background-color': color, border: 'solid 1px #8395a7' }
                : { 'background-color': color }
            ]"
          ></span>
          <p>{{ percentColorsMerge(colors) }} %</p>
        </h5>
      </li>
    </ul>
    <div class="buttons-wrapper">
      <Button
        @click.native="resetOptionMerge"
        :label="'Cancel'"
        :iconButton="'ban'"
      ></Button>
      <Button
        @click.native="showModal($modal)"
        :label="'Generate'"
        :iconButton="'sync-alt'"
      ></Button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Button from '../components/Button'
export default {
  name: 'Toast',
  components: {
    Button
  },
  props: {
    unicorns: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['colorsUnicornsToMerge']),
    ...mapGetters(['percentColorsMerge'])
  },

  mounted() {
    this.setColorsUnicornsToMerge(this.unicorns)
  },
  methods: {
    ...mapActions([
      'showModal',
      'resetOptionMerge',
      'setColorsUnicornsToMerge',
      'displayPercentageColors'
    ])
  }
}
</script>

<style lang="less" scoped>
@import '../utils/less/colors.less';
@import '../utils/less/mediaQueries.less';
.toast {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  padding: 1rem 0;
  border-top: solid 1px @light-grey;
  background-color: @very-light-grey;
  color: @very-dark-grey;
  transform: translateY(0);
  animation: translation 0.5s;
  @keyframes translation {
    0% {
      transform: translateY(100px);
    }

    100% {
      transform: translateY(0);
    }
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;
    margin: 0;
    padding: 0;
    @media @tablet {
      grid-template-columns: repeat(4, 1fr);
    }
    li {
      padding: 0.5rem;
      list-style: none;
      .preview-color {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10rem;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
      .characteristic {
        font-weight: 500;
        border-bottom: 1px solid @light-grey;
      }
      p {
        display: inline-block;
        margin: 0.25rem;
        font-weight: 600;
      }
    }
  }
  .buttons-wrapper {
    display: flex;
  }
}
</style>
