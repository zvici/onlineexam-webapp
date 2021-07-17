<template>
  <div
    class="card-test-schedule"
    @click="toExam(dataSchedule._id)"
  >
    <b-card class="card-body">
      <div
        v-if="!compareTime"
        class="overlay-test"
      >
        <p>Không khả dụng</p>
      </div>
      <div class="line" />
      <div class="main">
        <p class="name">
          {{ dataSchedule.name }}
        </p>
        <div class="time">
          <feather-icon
            icon="CalendarIcon"
            color="#ef476f"
            size="20"
          />
          <span>{{ dataSchedule.timeStart | formatTime }}</span>
          <span>-</span>
          <span>{{ dataSchedule.timeEnd | formatTime }}</span>
          <span>ngày</span>
          <span>{{ dataSchedule.timeStart | formatDate }}</span>
        </div>
        <div class="time">
          <feather-icon
            icon="ClockIcon"
            color="#ef476f"
            size="20"
          />
          <span>{{ dataSchedule.time }}</span>
          <span>phút</span>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { BCard } from 'bootstrap-vue'
import moment from 'moment'

export default {
  components: {
    BCard,
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
      }
      return value
    },
    formatTime(value) {
      if (value) {
        return moment(String(value)).format('HH:mm')
      }
      return value
    },
  },
  props: {
    dataSchedule: {
      type: Object,
      required: true,
    },
  },
  computed: {
    compareTime() {
      const today = new Date()
      const dateEnd = new Date(this.dataSchedule.timeEnd)
      const dateStart = new Date(this.dataSchedule.timeStart)
      if (dateEnd < today || dateStart > today) return false
      return true
    },
  },
  methods: {
    toExam(id) {
      if (this.compareTime === true) {
        this.$swal({
          title: 'Bạn chắc chắn chứ?',
          text: 'Bắt đầu làm bài thi!',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Bắt đầu!',
          cancelButtonText: 'Trở về',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.value) {
            this.$router.push(`/exam/${id}`)
          }
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.card-test-schedule {
  position: relative;
  cursor: pointer;
  .card-body {
    // background-image: linear-gradient(135deg, #f0fffe 10%, #e3fffc 100%);
    display: flex;
    padding: 5px;
    border-radius: 7px;
    .overlay-test{
      position: absolute;
      background-color: rgba(128, 128, 128, 0.131);
      width: 100%;
      height: 100%;
      margin-top: -10px;
      margin-left: -10px;
      display: flex;
      border-radius: 7px;
      justify-content: flex-end;
      padding-top: 8px;
      padding-right: 8px;
      p{
        color: red;
        font-weight: bold;
        transform: rotate(20deg);
      }
    }
    .line {
      width: 10px;
      height: 120px;
      border-radius: 7px;
      background-color: #00c58e;
    }
    .main {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 20px;
      .name {
        // color: #364975;
        font-weight: bold;
        font-size: 16px;
      }
      .time {
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
