<template>
  <div class="layout-default">
    <the-navbar :userData="userData" />
    <b-container class="main">
      <the-sidebar />
      <div class="the-content">
        <slot />
      </div>
    </b-container>
    <the-footer />
  </div>
</template>
<script>
import TheNavbar from "@/components/Navbar/TheNavbar.vue";
import TheSidebar from "@/components/Sidebar/TheSidebar.vue";
import TheFooter from "../Footer/TheFooter.vue";
export default {
  components: {
    TheNavbar,
    TheSidebar,
    TheFooter,
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-default {
  background-color: rgb(242, 242, 242);
  .main {
    display: flex;
    .the-content {
      min-width: 75%;
      padding: 10px 0px 10px 0px;
      min-height: calc(100vh - 120px);
    }
  }
}
</style>
