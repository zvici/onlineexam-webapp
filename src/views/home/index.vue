<template>
  <div class="home-page">
    <b-row class="m-auto">
      <b-card
        cols="12"
        border-variant="light"
        header="Thông tin người dùng"
        class="shadow-sm"
      >
        <b-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
        >
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
};
</script>
<style lang="scss" scoped>
.home-page {
  .card {
    width: 100%;
  }
}
</style>
