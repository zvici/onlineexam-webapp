<template>
  <div
    class="card-test-schedule"
    @click="toExam(dataSchedule._id)"
  >
    <b-card :title="dataSchedule.name">
      <b-card-text>{{
        `${dataSchedule.timeStart} - ${dataSchedule.timeEnd}`
      }}</b-card-text>
      <b-card-text><b-link>
        30/04/2021
      </b-link></b-card-text>
    </b-card>
  </div>
</template>
<script>
import { BCard, BCardText, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
  },
  props: {
    dataSchedule: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toExam(id) {
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
    },
  },
}
</script>
<style lang="scss" scoped>
.card-test-schedule {
  cursor: pointer;
}
</style>
