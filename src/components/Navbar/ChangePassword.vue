<template>
  <div>
    <b-sidebar
      id="sidebar-1"
      title="Đổi mật khẩu"
      shadow
      :visible="visible"
      backdrop
      right
      @hidden="onCloseModal"
      :no-close-on-backdrop="false"
    >
      <div class="px-3 py-2">
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-form-group
            id="input-group-current-password"
            label="Mật khẩu cũ"
            label-for="input-current-password"
          >
            <b-form-input
              id="input-current-password"
              v-model="form.currentPassword"
              type="password"
              :state="state.currentPassword"
              placeholder="Nhập mật khẩu cũ"
              required
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-current-password">
              Mật khẩu cũ của bạn không chính xác
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-new-password"
            label="Mật khẩu mới"
            label-for="input-new-password"
          >
            <b-form-input
              id="input-new-password"
              v-model="form.newPassword"
              :state="state.newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              required
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-new-password">
              Mật khẩu mơi phải từ 6 kí tự trở lên
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group
            id="input-group-confirm-new-password"
            label="Xác nhận mật khẩu mới"
            label-for="input-confirm-new-password"
          >
            <b-form-input
              id="input-confirm-new-password"
              v-model="form.confirmNewPassword"
              :state="state.confirmNewPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              @input="onChangeConfirmNewPassword"
              required
            ></b-form-input>
            <b-form-invalid-feedback
              id="input-live-feedback-cunfirm-new-password"
            >
              Mật khẩu xác nhận phải trùng với mật khẩu mới
            </b-form-invalid-feedback>
          </b-form-group>
          <b-overlay
            :show="loading"
            rounded
            opacity="0.6"
            spinner-small
            spinner-variant="primary"
          >
            <b-button type="submit" class="shadow-sm" variant="success"
              >Cập nhật mật khẩu</b-button
            >
          </b-overlay>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
import userServices from "@/api/userServices";
export default {
  data() {
    return {
      loading: false,
      form: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      state: {
        currentPassword: null,
        newPassword: null,
        confirmNewPassword: null,
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    onCloseModal() {
      this.$emit("onCloseModalPassword");
      this.onReset();
    },
    onChangeConfirmNewPassword() {
      if (this.form.newPassword === this.form.confirmNewPassword) {
        this.state.confirmNewPassword = true;
      } else this.state.confirmNewPassword = false;
    },
    onSubmit() {
      this.loading = true;
      userServices.methods.changePassword(this.form);
      console.log("hihi");
    },
    onReset() {
      this.form.currentPassword = "";
    },
  },
};
</script>
<style lang="scss" scoped>
button {
  width: 100%;
}
</style>
