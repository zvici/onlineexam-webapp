<template>
  <b-overlay
    :show="show"
    rounded="sm"
    class="overlay-page"
    spinner-variant="primary"
  >
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
  </b-overlay>
</template>

<script>
import TestSchedule from '@/components/Card/TestSchedule.vue'
import scheduleApi from '@/api/schedulesApi'
import { BRow, BCol, BOverlay } from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TestSchedule,
    BRow,
    BCol,
    BOverlay,
  },
  data() {
    return {
      listSchedule: [],
      show: true,
    }
  },
  computed: {
    ...mapGetters(['userData']),
  },
  async created() {
    try {
      const response = await scheduleApi.getSchedulesByAttendants(
        // eslint-disable-next-line no-underscore-dangle
        this.userData._id,
      )
      this.listSchedule = response.data
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error)
    } finally {
      this.show = false
    }
  },
}
</script>

<style lang="scss" scoped>
.overlay-page {
  height: calc(100vh - 120px);
}
</style>
