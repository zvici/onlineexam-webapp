<template>
  <div>This is Password Retrieval</div>
</template>
<script>
export default {
  created() {
    // Remove layout khi vào trang
    this.$emit("update:layout", "div");
  },
};
</script>
