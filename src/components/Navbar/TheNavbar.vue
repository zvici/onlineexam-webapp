<template>
  <header class="the-navbar">
    <b-container>
      <div class="logo">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/images/logo_exam.png" alt="logo" />
        </router-link>
      </div>
      <div class="menu">
        <div class="dropdown-navbar">
          <b-dropdown no-caret right>
            <template #button-content>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
              <p class="ml-2">
                {{ userData.lastName + " " + userData.firstName }}
              </p>
            </template>
            <b-dropdown-item @click.prevent="onOpenModalChangePassword"
              >Đổi mật khẩu</b-dropdown-item
            >
            <b-dropdown-item @click.prevent="onLogout"
              >Đăng xuất</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </b-container>
    <change-password
      :visible="visible"
      @onCloseModalPassword="onCloseModalPassword"
    />
  </header>
</template>
<script>
import ChangePassword from "./ChangePassword.vue";
export default {
  components: { ChangePassword },
  props: {
    userData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {
    this.userFullName = JSON.parse(localStorage.getItem("userData")).name;
  },
  methods: {
    onLogout() {
      // Remove store token khi vào trang login
      this.$store.commit("removeAuthentication");
      this.$router.push("/login");
    },
    onOpenModalChangePassword() {
      this.visible = true;
    },
    onCloseModalPassword() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.the-navbar {
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0px;
  left: 0px;
  background: rgb(255, 255, 255);
  will-change: background;
  transition: background 0.2s linear 0s;
  box-shadow: rgb(31 38 46 / 20%) 0px 1px 2px;
  z-index: 2;
  .logo {
    img {
      width: 90px;
    }
  }
  .container {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
