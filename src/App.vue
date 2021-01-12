<template>
  <div id="app">
    <ToggleTheme
      @change.native="toggleTheme"
      class="toogle-theme"
    ></ToggleTheme>
    <router-view />
  </div>
</template>

<script>
import './utils/filters'
import ToggleTheme from './components/ToggleTheme'
export default {
  components: {
    ToggleTheme
  },
  data() {
    return {
      theme: localStorage.getItem('theme') || 'lightTheme'
    }
  },
  mounted() {
    localStorage.setItem('theme', this.theme)
    document.documentElement.setAttribute('data-theme', this.theme)
  },
  methods: {
    toggleTheme: function() {
      this.theme = this.theme === 'darkTheme' ? 'lightTheme' : 'darkTheme'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>

<style lang="less">
@import './utils/less/colors.less';
@import './utils/less/mediaQueries.less';
body,
html {
  margin: 0;
  &[data-theme='lightTheme'] {
    background-color: #ffffff;
    color: @very-dark-grey;
    .card {
      border-radius: 0.5rem;
      border: solid 1px @light-grey;
      li {
        border-bottom: solid 1px @light-grey;
      }
    }
    svg {
      fill: @very-dark-grey;
    }
  }
  &[data-theme='darkTheme'] {
    background-color: @very-dark-grey;
    color: #ffffff;
    .card {
      border-radius: 0.5rem;
      border: solid 1px @dark-grey;
      li {
        border-bottom: solid 1px @dark-grey;
      }
    }
    .modal {
      background-color: @very-dark-grey;
    }
    svg {
      fill: #ffffff;
    }
  }
}

#app {
  font-family: 'Open Sans', sans-serif;
  margin: auto;
  @media @desktop {
    max-width: 90vw;
  }
  @media @large {
    max-width: 70vw;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
  h1 {
    padding: 1.25rem 0.75rem;
    font-size: 1.25rem;
    @media @tablet {
      padding: 2rem 2rem 2rem 0;
      font-size: 2rem;
    }
  }
  .toogle-theme {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
