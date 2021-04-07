<template>
  <div class="the-sidebar">
    <div class="menu">
      <router-link :to="{ name: 'Home' }">Trang Chủ</router-link>
      <router-link :to="{ name: 'Profile' }">Thông tin chung</router-link>
      <router-link :to="{ name: 'About' }">Khác</router-link>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.the-sidebar {
  min-width: 25%;
  position: sticky;
  right: 0px;
  top: calc(60px);
  height: min-content;
  padding: 10px 10px 0px 0px;

  .menu {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    a {
      padding: 15px;
      text-decoration: none;
      border-right: 3px solid white;
      color: grey;
    }
    .router-link-exact-active {
      color: #00c58e;
      border-right: 3px solid #00c58e;
    }
  }
}
</style>
