<template>
  <button name="button" type="button" :aria-label="label">
    <font-awesome-icon :icon="['fas', iconButton]" />
    <span>
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    iconButton: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../utils/less/colors.less';
button {
  height: 3rem;
  margin: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  span {
    margin-left: 0.25rem;
  }
  background-color: @dark-yellow;
  &:hover {
    background-color: @yellow;
  }
}
</style>
