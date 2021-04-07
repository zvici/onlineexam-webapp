<template>
  <div class="home-page">
    <b-row class="m-auto">
      <b-card
        cols="12"
        border-variant="light"
        header="Thông tin người dùng"
        class="shadow-sm"
      >
        <b-card-text>{{ userData }}</b-card-text>
      </b-card>
    </b-row>
  </div>
</template>
<script>
import LayoutDefault from "@/components/Layouts/LayoutDefault.vue";
export default {
  created() {
    this.$emit("update:layout", LayoutDefault);
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  .card {
    width: 100%;
  }
}
</style>
