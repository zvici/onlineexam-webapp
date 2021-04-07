<template>
  <header class="the-navbar">
    <b-container>
      <div class="logo">
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </div>
      <div class="menu">
        <div class="dropdown">
          <div class="dropbtn">
            <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            <label>{{ userFullName }}</label>
            <b-icon icon="caret-down-fill"></b-icon>
          </div>
          <div class="dropdown-content">
            <div class="dropdown-content-menu">
              <b-button squared variant="light">Thông tin cá nhân</b-button>
              <b-button
                squared
                variant="light"
                @click.prevent="onOpenModalChangePassword"
                >Đổi mật khẩu</b-button
              >
              <b-button squared variant="light" @click.prevent="onLogout"
                >Đăng xuất</b-button
              >
            </div>
          </div>
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
  data() {
    return {
      userFullName: "",
      visible: false,
    };
  },
  created() {
    this.userFullName = JSON.parse(localStorage.getItem("userData")).name;
  },
  methods: {
    onLogout() {
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
  .container {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menu {
      display: flex;
      justify-content: center;
      align-items: center;
      .dropbtn {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        label {
          margin: 0 5px;
          cursor: pointer;
        }
      }

      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-content {
        padding: 10px 10px;
        display: none;
        position: absolute;
        right: 0;
        min-width: 220px;
        z-index: 1;
      }
      .dropdown-content-menu {
        background: white;
        padding: 10px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
          rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        border-radius: 5px;
      }
      .dropdown-content button {
        text-align: start;
        border: none;
        border-left: 3px solid rgb(255, 255, 255);
        width: 100%;
        background: white;
        color: black;
        padding: 12px 5px 12px 26px;
        display: block;
      }
      .dropdown-content button:hover {
        color: #00c58e;
        border-left: 3px solid #00c58e;
        background-color: #f0fff4;
      }
      .dropdown:hover .dropdown-content {
        display: block;
      }
      .dropdown:hover .dropbtn {
        color: green;
      }
    }
  }
}
</style>
