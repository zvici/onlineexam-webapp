<template>
  <div class="the-sidebar">
    <div class="menu">
      <router-link :to="{ name: 'Home' }">
        <b-icon icon="house-fill" class="mr-2" /> Trang Chủ</router-link
      >
      <router-link :to="{ name: 'Profile' }"
        ><b-icon icon="calendar2-range-fill" class="mr-2" /> Lịch
        thi</router-link
      >
      <router-link :to="{ name: 'About' }"
        ><b-icon icon="house-fill" class="mr-2" /> Kết quả thi</router-link
      >
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
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 10px;
    a {
      font-weight: 600;
      padding: 15px;
      font-size: 1.1rem;
      text-decoration: none;
      color: grey;
      border-radius: 10px;
    }
    .router-link-exact-active {
      color: #ffffff;
      background: #1ac59d;
      animation: circle 0.25s ease-in-out;
    }
  }
  @keyframes circle {
    0% {
      clip-path: polygon(0% 0%, 11% 0, 19% 49%, 10% 100%, 0% 100%);
    }
    100% {
      clip-path: polygon(0% 0%, 100% 0, 100% 50%, 100% 100%, 0% 100%);
    }
  }
}
</style>
