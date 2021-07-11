<template>
  <div>
    <test-schedule
      v-for="item in listSchedule"
      :key="item._id"
      :data-schedule="item"
    />
  </div>
</template>

<script>
import TestSchedule from '@/components/Card/TestSchedule.vue'
import scheduleApi from '@/api/schedulesApi'

export default {
  components: {
    TestSchedule,
  },
  data() {
    return {
      listSchedule: [],
    }
  },
  async created() {
    try {
      const response = await scheduleApi.getSchedulesByAttendants(
        '60e94cf5a6de8a0015b93882',
      )
      this.listSchedule = response.data
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style></style>
