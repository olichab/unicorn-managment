<template>
  <div>
    <label>{{ label | uppercaseFirstLetter }}</label>
    <div class="btn-group" role="group" aria-label="button group">
      <button
        v-for="(color, index) in colors"
        :key="index"
        @click="select(color, index)"
        type="button"
        :style="[
          color === 'white'
            ? { 'background-color': color, border: 'solid 1px #8395a7' }
            : { 'background-color': color }
        ]"
        :class="{ active: index === activeColor }"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ButtonGroupcolors',
  props: {
    colors: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeColor: null
    }
  },
  methods: {
    ...mapActions(['selectColor']),
    select: function(color, index) {
      this.activeColor = index
      const payload = [this.label, color]
      this.selectColor(payload)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../utils/less/colors.less';
@import '../utils/less/mediaQueries.less';

label {
  font-weight: 600;
  border-bottom: solid 1px @light-grey;
}
.btn-group {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.75rem;
  margin-top: 0.75rem;
  @media @desktop {
    grid-template-columns: repeat(4, 35px);
    grid-gap: 0.5rem;
  }
  button {
    margin: auto;
    width: 25px;
    height: 25px;
    outline: none;
    cursor: pointer;
    outline-color: @blue;
    border: none;
    border-radius: 10rem;
    transition: all ease-in-out 0.25s;
    transform: scale(1);
    transform-origin: center;
    &:hover {
      transform: scale(1.45);
    }
  }
  .active {
    transform: scale(1.45);
  }
}
</style>
