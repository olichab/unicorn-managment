<template>
  <modal
    name="new-unicorn-modal"
    @before-open="beforeOpenModal"
    @closed="closeModal"
    :height="'auto'"
    :width="'90%'"
    :scrollable="true"
    classes="modal"
  >
    <div class="button-close">
      <font-awesome-icon @click="closeModal" :icon="['fas', 'times']" />
    </div>
    <h1>Choose your baby unicorn</h1>
    <div class="cards-modal-wrapper">
      <div
        v-for="unicorn in unicornPossibilities"
        :key="unicorn.idPossibility"
        class="card-modal-wrapper"
      >
        <Card :infosUnicorn="unicorn"></Card>
        <Button
          @click.native="postUnicorn(unicorn)"
          :label="'Create'"
          :iconButton="'plus'"
        ></Button>
      </div>
    </div>
  </modal>
</template>

<script>
import Vue from 'vue'
import VModal from 'vue-js-modal'
import Card from '../components/Card'
import Button from '../components/Button'
Vue.use(VModal)

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
  data() {
    return {
      unicornPossibilities: []
    }
  },
  methods: {
    beforeOpenModal(event) {
      let idPossibility = 0
      this.unicorns
        // Recover all colors pairs
        .reduce(
          (acc, unicorn, i) => {
            Object.values(unicorn.details).map((color, i) =>
              !acc[i].includes(color) ? acc[i].push(color) : null
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
                  this.unicornPossibilities.push({
                    idPossibility: idPossibility,
                    details: {
                      mane: x[0],
                      tail: x[1],
                      fur: x[2],
                      horn: y
                    }
                  })
                  idPossibility++
                }
                return [...x, y]
              })
            ),
          ['']
        )
    },
    closeModal() {
      this.unicornPossibilities = []
      this.$modal.hide('new-unicorn-modal')
    },
    postUnicorn: function(unicorn) {
      this.$parent.postUnicornSimple(unicorn)
      this.unicornPossibilities = []
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
