<template>
  <component :is="layout">
    <vue-topprogress ref="topProgress" style="z-index: 9999"></vue-topprogress>
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
