<template>
  <div class="card-info col-12">
    <b-card>
      <div class="pb-4">
        <h5 class="mb-0 font-weight-bold">Thông tin sinh viên</h5>
      </div>
      <b-card-text>
        <div class="left">
          <b-avatar
            variant="info"
            src="https://placekitten.com/300/300"
            size="8rem"
          ></b-avatar>
          <h5 class="text-center mt-2">
            {{ userData.lastName + " " + userData.firstName }}
          </h5>
        </div>
        <div class="right">
          <b-row>
            <b-col>
              <b-row>MSSV: <label>Chưa có</label></b-row>
              <b-row
                >Họ tên:
                <label>{{
                  userData.lastName + " " + userData.firstName
                }}</label></b-row
              >
              <b-row>Giới tính: <label>Chưa có</label></b-row>
              <b-row>Ngày sinh:<label>Chưa có</label></b-row>
              <b-row>Nơi sinh:<label>Chưa có</label></b-row>
            </b-col>
            <b-col>
              <b-row>Lớp học: <label>Chưa có</label></b-row>
              <b-row>Khóa học:<label>Chưa có</label></b-row>
              <b-row>Bậc đào tạo:<label>Đại học</label></b-row>
              <b-row>Loại hình đào tạo:<label>Chính quy</label></b-row>
              <b-row>Ngành: <label>Công nghệ thông tin</label></b-row>
            </b-col>
          </b-row>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    userData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.card-info {
  padding: 0;
  .card {
    border: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 10px;
  }
  .card-text {
    display: flex;
    justify-content: space-between;
    .right {
      flex: 1;
      padding: 0px 50px;
      .row {
        .row {
          margin: 12px 0;
          label {
            font-weight: 600;
            margin: 0 5px;
          }
        }
      }
    }
  }
}
</style>
