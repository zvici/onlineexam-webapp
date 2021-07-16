<template>
  <div>
    <b-card title="Kết quả thi">
      <b-table
        :fields="fields"
        :items="items"
        responsive="sm"
        bordered
        show-empty
        :busy="isBusy"
      >
        <!-- A virtual column -->
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #empty>
          <p :class="`text-center ${empty.status} m-0 py-3`">
            {{ empty.text }}
          </p>
        </template>
        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle" />
          </div>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import { BTable, BCard, BSpinner } from 'bootstrap-vue'
import resultApi from '@/api/resultApi'
import { mapGetters } from 'vuex'

export default {
  components: {
    BTable,
    BCard,
    BSpinner,
  },
  data() {
    return {
      fields: [
        { key: 'index', label: 'Số thứ tự' },
        { key: 'schedule.name', label: 'Tên lịch thi' },
        { key: 'schedule.time', label: 'Thời gian làm bài (phút)' },
        { key: 'score', label: 'Kết quả (điểm)' },
      ],
      items: [],
      isBusy: true,
      empty: {
        text: 'Hiện chưa có kết quả nào',
        status: 'text-primary',
      },
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
    } catch {
      this.empty = {
        text: 'Đã có lỗi xảy ra!',
        status: 'text-danger',
      }
    } finally {
      this.isBusy = false
    }
  },
}
</script>
