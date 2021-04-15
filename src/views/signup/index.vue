<template>
  <div class="signup">
    <div class="signup__formSignup">
      <h3 class="font-weight-bold my-3">Đăng ký</h3>
      <b-form @submit.prevent="onSignup">
        <b-row>
          <b-col col sm="6">
            <b-form-group
              id="input-group-last-name"
              label="Họ:"
              label-for="input-last-name"
            >
              <b-form-input
                id="input-last-name"
                type="text"
                placeholder="Nhập họ"
                required
                v-model="form.lastName"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col col sm="6">
            <b-form-group
              id="input-group-first-name"
              label="Tên:"
              label-for="input-first-name"
            >
              <b-form-input
                id="input-first-name"
                type="text"
                placeholder="Nhập Tên"
                v-model="form.firstName"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
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
        <b-form-group
          id="input-group-password"
          label="Mật khẩu:"
          label-for="input-password"
        >
          <b-form-input
            id="input-password"
            type="password"
            placeholder="Nhập mật khẩu"
            v-model="form.password"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox
          id="checkbox-1"
          name="checkbox-1"
          class="my-3"
          required
        >
          Đồng ý với các điều khoản của chúng tôi
        </b-form-checkbox>
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
        >
          <b-button variant="success" type="submit">Đăng ký</b-button>
        </b-overlay>
        <div class="signup__formSignup__login">
          <div>
            <label for="">Đã có tài khoản?</label>
            <router-link :to="{ name: 'Login' }"> Đăng nhập ngay</router-link>
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
      busy: false,
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
        .post("/users", this.form)
        .then((data) => {
          if (data.data.code === 1) {
            this.$bvToast.toast(
              `Đăng ký thành công với email ${data.data.data.email}`,
              {
                title: "Đăng ký thành công",
                variant: "success",
                solid: true,
              }
            );
          }
          this.busy = false;
        })
        .catch((e) => {
          this.$bvToast.toast(`${e}`, {
            title: "Có lỗi xảy ra",
            variant: "danger",
            solid: true,
          });
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
  background: url("../../assets/images/bg/bg.jpg");
  &__formSignup {
    padding: 20px;
    background: rgba(255, 255, 255, 0.837);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
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
