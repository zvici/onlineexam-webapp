<template>
  <div class="main-square">
    <div
      class="square"
      :style="{ backgroundColor: `${color}`, borderColor: `${borderColor}` }"
    >
      <p>{{ num }}</p>
    </div>
  </div>
</template>
<script>
export default {
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
