<template>
  <div
    class="card-test-schedule"
    @click="toExam"
  >
    <b-card title="TOEIC 🚀">
      <b-card-text>9:00 - 10:00</b-card-text>
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
  methods: {
    toExam() {
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
          this.$router.push('/exam')
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
