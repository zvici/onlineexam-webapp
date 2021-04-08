<template>
  <div class="changePassword">
    <div class="changePassword__formChangePassword">
      <h3 class="font-weight-bold my-3">Nhật mật khẩu mới</h3>
      <b-form @submit.prevent="onChangePassword">
        <b-form-group
          id="input-group-new-password"
          label="Mật khẩu:"
          label-for="input-new-password"
        >
          <b-form-input
            id="input-new-password"
            type="password"
            placeholder="Nhập mật khẩu mới"
            required
            v-model="form.newPassword"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-confirm-new-password"
          label="Xác nhận mật khẩu:"
          label-for="input-confirm-new-password"
        >
          <b-form-input
            id="input-confirm-new-password"
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            :state="confirmState"
            required
            v-model="form.confirmPassword"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback">
            Mật khẩu phải giống nhau
          </b-form-invalid-feedback>
        </b-form-group>
        <b-overlay
          :show="busy"
          rounded
          opacity="0.6"
          spinner-small
          spinner-variant="primary"
        >
          <b-button variant="success" type="submit">Lấy lại mật khẩu</b-button>
        </b-overlay>
      </b-form>
    </div>
  </div>
</template>
<script>
import axios from "@/axios/axios";
export default {
  data() {
    return {
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      busy: false,
      confirmState: null,
    };
  },
  beforeCreate() {
    axios
      .post("users/check-password-retrieval", {
        id: this.$route.params.code.split("&&")[0],
        codePasswordRetrieval: this.$route.params.code.split("&&")[1],
      })
      .then(() => {})
      .catch(() => {
        this.$router.push({ name: "NotFound" });
      });
  },
  created() {
    // Remove layout khi vào trang
    this.$emit("update:layout", "div");
  },
  methods: {
    onChangePassword() {
      this.busy = true;
      if (
        this.form.newPassword === this.form.confirmPassword &&
        this.form.newPassword !== ""
      ) {
        axios
          .post("users/change-password-from-email", {
            id: this.$route.params.code.split("&&")[0],
            codePasswordRetrieval: this.$route.params.code.split("&&")[1],
            password: this.form.newPassword,
          })
          .then(() => {
            this.$fire({
              title: "Thông báo",
              text: "Đổi mật khẩu thành công",
              type: "success",
              timer: 3000,
            }).then(() => {
              this.$router.push({ name: "Login" });
            });
            this.busy = false;
          })
          .catch(() => {
            this.busy = false;
          });
      } else {
        this.confirmState = false;
        this.busy = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.changePassword {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__formChangePassword {
    min-width: 400px;
    border-radius: 3px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    button {
      width: 100%;
    }
  }
}
</style>
