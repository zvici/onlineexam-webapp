<template>
  <div class="home-page">
    <b-row class="m-auto">
      <info-user :userData="userData" />
    </b-row>
  </div>
</template>
<script>
import LayoutDefault from "@/components/Layouts/LayoutDefault.vue";
import InfoUser from "./components/InfoUser.vue";
export default {
  components: { InfoUser },
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
