<template>
  <div class="main-sub">
    <div
      class="mask"
      :style="{ backgroundColor: `${color}` }"
    />
    <div class="label">
      {{ title }}
    </div>
  </div>
</template>
<script>
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  props: {
    color: {
      type: String,
      default: 'white',
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.main-sub {
  display: flex;
  align-items: center;
  justify-content: center;
  .mask {
    width: 15px;
    height: 15px;
    border-radius: 10px;
  }
  .label {
    margin-left: 20px;
    color: black;
    font-weight: 500;
  }
}
</style>
