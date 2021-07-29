<template>
  <div class="result-page">
    <b-card title="Kết quả thi">
      <div class="info">
        <tr>
          <th>Tên thí sinh:</th>
          <th class="pl-1">
            {{ userData.fullName }}
          </th>
        </tr>
        <tr>
          <th>Ngày sinh:</th>
          <th class="pl-1">
            {{ birthday }}
          </th>
        </tr>
        <tr>
          <th>Giới tính:</th>
          <th class="pl-1">
            {{ userData.gender === true ? 'Nam' : 'Nữ' }}
          </th>
        </tr>
      </div>

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
      <download-excel
        v-if="items.length > 0"
        class="btn btn-success float-right"
        :data="items"
        :fields="json_fields"
        :header="`Kết quả thi của thí sinh ${userData.fullName}`"
        :name="`${userData.code}.xls`"
      >
        Xuất file Excel
      </download-excel>
    </b-card>
  </div>
</template>

<script>
import { BTable, BCard, BSpinner } from 'bootstrap-vue'
import resultApi from '@/api/resultApi'
import { mapGetters } from 'vuex'
import moment from 'moment'

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
        { key: 'schedule.timeStart', label: 'Ngày thi', formatter: 'dateTime' },
        { key: 'schedule.time', label: 'Thời gian làm bài (phút)' },
        { key: 'score', label: 'Kết quả (điểm)' },
      ],
      items: [],
      isBusy: true,
      empty: {
        text: 'Hiện chưa có kết quả nào',
        status: 'text-primary',
      },
      json_fields: {
        'Tên lịch thi': 'schedule.name',
        'Ngày thi': {
          callback: value => `${moment(value.schedule.timeStart).format('DD/MM/YYYY HH:mm')}`,
        },
        'Thời gian làm bài (Phút)': 'schedule.time',
        Điểm: 'score',
      },
    }
  },
  computed: {
    ...mapGetters(['userData']),
    birthday() {
      return moment(this.userData.birthday, 'YYYY-MM-DD').format('DD-MM-YYYY')
    },
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
  methods: {
    dateTime(value) {
      return `${moment(value).format('DD/MM/YYYY  -  HH:mm')}`
    },
  },
}
</script>
<style lang="scss" scoped>
.result-page {
  .info {
    margin-top: -12px;
    th {
      padding-top: 10px;
    }
    padding-bottom: 20px;
  }
}
</style>
