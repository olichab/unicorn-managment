<template>
  <label @change="toggleTheme" class="switch">
    <input type="checkbox" :checked="this.theme === 'darkTheme'" />
    <span class="slider round"></span>
  </label>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Toggletheme',
  computed: {
    ...mapState(['theme'])
  },
  mounted() {
    this.setTheme()
  },
  methods: {
    ...mapActions(['setTheme', 'toggleTheme'])
  }
}
</script>

<style lang="less" scoped>
@import '../utils/less/colors.less';
.switch {
  width: 40px;
  height: 15px;
  input {
    display: none;
    &:checked + .slider {
      background-color: @light-grey;
      &:before {
        transform: translateX(20px);
        background: white
          url('https://img.icons8.com/ios-glyphs/30/000000/bright-moon--v2.png');
        background-size: 20px 20px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background-color: @light-grey;
    transition: 0.5s;
    &:before {
      position: absolute;
      content: '';
      height: 25px;
      width: 25px;
      left: 0px;
      bottom: 4px;
      top: 0;
      bottom: 0;
      margin: auto 0;
      transition: 0.5s;
      box-shadow: 0 0 5px @medium-grey;
      background: white
        url('https://img.icons8.com/ios-glyphs/50/000000/sun--v1.png');
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .round {
    border-radius: 1rem;
    &:before {
      border-radius: 1rem;
    }
  }
}
</style>
