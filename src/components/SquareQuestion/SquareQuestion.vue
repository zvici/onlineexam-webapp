<template>
  <div class="main-square">
    <div
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      class="square"
      :style="{ backgroundColor: `${color}`, borderColor: `${borderColor}` }"
      @click="onChange"
    >
      <p>{{ num }}</p>
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
    num: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 2,
    },
    id: {
      type: String,
      default: '',
    },
    selectq: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    color() {
      switch (this.status) {
        case 1:
          return '#00C58E'
        case 2:
          return '#DA7B03'
        case 3:
          return '#454545'
        default:
          return '#DA7B03'
      }
    },
    borderColor() {
      if (this.selectq + 1 === this.num) {
        return '#0468BF'
      }
      return 'white'
    },
  },
  methods: {
    onChange() {
      this.$emit('changeQuestion', this.num)
    },
  },
}
</script>
<style lang="scss" scoped>
.main-square {
  padding: 10px;
  .square {
    cursor: pointer;
    width: 40px;
    height: 40px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 3px solid;
    p {
      font-weight: bold;
      margin: 0;
      font-size: 15px;
    }
  }
}
</style>
