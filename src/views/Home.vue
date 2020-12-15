<template>
  <div class="home">
    {{ unicorns }}
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      unicorns: []
    }
  },
  mounted () {
    this.$axios.get('/api/unicorns')
      .then(response => {
        this.unicorns = response.data.unicorns
      })
  }
}
</script>

<style lang="less"></style>
