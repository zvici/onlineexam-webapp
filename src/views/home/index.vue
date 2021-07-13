<template>
  <div>
    <b-row>
      <b-col
        v-for="item in listSchedule"
        :key="item._id"
        cols="12"
        md="6"
      >
        <test-schedule :data-schedule="item" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import TestSchedule from '@/components/Card/TestSchedule.vue'
import scheduleApi from '@/api/schedulesApi'
import { BRow, BCol } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TestSchedule,
    BRow,
    BCol,
  },
  data() {
    return {
      listSchedule: [],
    }
  },
  computed: {
    ...mapGetters([
      'userData',
    ]),
  },
  async created() {
    try {
      const response = await scheduleApi.getSchedulesByAttendants(
        // eslint-disable-next-line no-underscore-dangle
        this.userData._id,
      )
      console.log(response.data)
      this.listSchedule = response.data
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error)
    }
  },
}
</script>

<style></style>
