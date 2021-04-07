<template>
  <div>this is profile</div>
</template>
<script>
import LayoutDefault from "@/components/Layouts/LayoutDefault.vue";
export default {
  created() {
    this.$emit("update:layout", LayoutDefault);
  },
};
</script>
