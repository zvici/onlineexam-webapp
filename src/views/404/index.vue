<template>
  <div class="error">
    <img src="@/assets/images/404.jpg" alt="404" />
    <router-link :to="{ name: 'Home' }"
      >Click vào đây để quay lại Trang chủ</router-link
    >
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.error {
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    font-size: 1.5rem;
  }
}
</style>
