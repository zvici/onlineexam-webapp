<template>
  <div class="signup">
    <div class="signup__formSignup">
      <h3 class="font-weight-bold my-3">Quên mật khẩu</h3>
      <b-form @submit.prevent="onSignup">
        <b-form-group
          id="input-group-email"
          label="Email:"
          label-for="input-email"
        >
          <b-form-input
            id="input-email"
            type="email"
            placeholder="Nhập Email"
            required
            v-model="form.email"
          ></b-form-input>
        </b-form-group>
        <b-alert :variant="this.noti.variant" :show="this.noti.show">{{
          this.noti.message
        }}</b-alert>
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
        >
          <b-button variant="success" type="submit">Lấy lại mật khẩu</b-button>
        </b-overlay>
        <div class="signup__formSignup__login">
          <div>
            <label for="">Thử lại?</label>
            <router-link :to="{ name: 'Login' }"> Đăng nhập </router-link>
          </div>
        </div>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from "../../axios/axios";
export default {
  data() {
    return {
      form: {
        email: "",
      },
      busy: false,
      noti: {
        variant: "success",
        show: false,
        message: "",
      },
    };
  },
  created() {
    // Remove layout khi vào trang login
    this.$emit("update:layout", "div");
  },
  methods: {
    onSignup() {
      this.busy = true;
      axios
        .post("/users/password-retrieval", this.form)
        .then((data) => {
          if (data.data.code === 1) {
            this.noti.show = true;
            this.noti.variant = "success";
            this.noti.message = data.data.message;
          }
          this.busy = false;
        })
        .catch((error) => {
          console.log(error);
          this.noti.show = true;
          this.noti.variant = "danger";
          this.noti.message = "Không tìm thấy người dùng này";
          this.busy = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.signup {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__formSignup {
    min-width: 400px;
    border-radius: 3px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    button {
      width: 100%;
    }
    &__login {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      margin-top: 10px;
      label {
        margin: 0;
      }
      a {
        font-weight: bold;
      }
    }
  }
}
</style>
