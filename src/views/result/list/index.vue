<template>
  <div>
    <b-card>
      <b-table
        :fields="fields"
        :items="items"
        responsive="sm"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BTable, BCard } from 'bootstrap-vue'
import resultApi from '@/api/resultApi'
import { mapGetters } from 'vuex'

export default {
  components: {
    BTable,
    BCard,
  },
  data() {
    return {
      fields: [
        { key: 'index', label: 'Số thứ tự' },
        { key: 'schedule.name', label: 'Tên lịch thi' },
        { key: 'schedule.time', label: 'Thời gian làm bài (phút)' },
        { key: 'score', label: 'Kết quả' },
      ],
      items: [],
    }
  },
  computed: {
    ...mapGetters(['userData']),
  },
  async created() {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const response = await resultApi.getResultByUser(this.userData._id)
      this.items = response.data.data
    } catch (err) {
      console.log(err)
    }
  },

}
</script>
