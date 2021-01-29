<template>
  <modal
    name="new-unicorn-modal"
    @before-open="findAllUnicornPossibilities(unicorns)"
    @closed="hideModal($modal)"
    :height="'auto'"
    :width="'90%'"
    :scrollable="true"
    classes="modal"
  >
    <div class="button-close">
      <font-awesome-icon @click="hideModal($modal)" :icon="['fas', 'times']" />
    </div>
    <h1>Choose your baby unicorn</h1>
    <div class="cards-modal-wrapper">
      <div
        v-for="unicorn in unicornPossibilities"
        :key="unicorn.id"
        class="card-modal-wrapper"
      >
        <Card :infosUnicorn="unicorn"></Card>
        <Button
          @click.native="post(unicorn, $modal)"
          :label="'Create'"
          :iconButton="'plus'"
        ></Button>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Card from '../components/Card'
import Button from '../components/Button'

export default {
  name: 'ModalNewUnicorn',
  components: {
    Card,
    Button
  },
  props: {
    unicorns: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['unicornPossibilities'])
  },
  methods: {
    ...mapActions(['postUnicorn', 'hideModal', 'findAllUnicornPossibilities']),
    post: function(unicorn, modal) {
      this.postUnicorn(unicorn)
      this.hideModal(modal)
    }
  }
}
</script>

<style lang="less">
@import '../utils/less/mediaQueries.less';
.modal {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  .button-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.25rem;
    &:hover {
      cursor: pointer;
    }
  }
  .cards-modal-wrapper {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    @media @tablet {
      grid-template-columns: repeat(4, 1fr);
    }
    @media @desktop {
      grid-template-columns: repeat(6, 1fr);
    }
    .card-modal-wrapper {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
