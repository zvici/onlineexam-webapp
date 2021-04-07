<template>
  <component :is="layout">
    <router-view :layout.sync="layout" />
  </component>
</template>
<script>
export default {
  data() {
    return {
      layout: "div",
    };
  },
};
</script>
<style lang="scss"></style>
