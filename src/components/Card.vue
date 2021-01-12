<template>
  <div class="card">
    <div class="card-img">
      <img src="../assets/images/unicorn.svg" alt="unicorn" />
      <span v-if="infosUnicorn.id" class="id-unicorn">{{
        infosUnicorn.id
      }}</span>
    </div>
    <div class="card-body">
      <h3 v-if="infosUnicorn.name">{{ infosUnicorn.name }}</h3>
      <ul>
        <li
          v-for="(color, characteristic) in infosUnicorn.details"
          :key="characteristic"
        >
          <h5>
            {{ characteristic | uppercaseFirstLetter }}
          </h5>
          <h4>
            {{ color | uppercaseFirstLetter }}
            <span
              class="preview-color"
              :style="[
                color === 'white'
                  ? { 'background-color': color, border: 'solid 1px #8395a7' }
                  : { 'background-color': color }
              ]"
            ></span>
          </h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    infosUnicorn: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
@import '../utils/less/colors.less';
@import '../utils/less/mediaQueries.less';
.card {
  .card-img {
    position: relative;
    width: 100%;
    background-color: @light-yellow;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  .id-unicorn {
    position: absolute;
    bottom: -1rem;
    right: 0.75rem;
    width: 20px;
    height: 20px;
    padding: 0.5rem;
    background-color: @blue;
    color: @very-dark-grey;
    font-weight: 600;
    text-align: center;
    border-radius: 10rem;
  }

  .card-body {
    padding: 0.75rem 1rem;
    h4 {
      font-size: 0.85rem;
      @media @tablet {
        font-size: 1rem;
      }
    }
    h5 {
      font-weight: 500;
    }
    ul {
      padding: 0;
      margin-bottom: 0;
      li {
        padding: 0.25rem 0;
        list-style: none;
        &:last-child {
          border: none;
        }
        .preview-color {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 10rem;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
