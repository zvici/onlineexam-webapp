import axios from '../axios/axios'

const schedulesApi = {
  getSchedulesByAttendants: id => axios.get(`/schedules/attendants/${id}`),
  getSchedulesById: id => axios.get(`/schedules/${id}`),
}
export default schedulesApi
