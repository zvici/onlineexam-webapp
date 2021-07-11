import axios from '../axios/axios'

const schedulesApi = {
  getSchedulesByAttendants: id => axios.get(`/schedules/attendants/${id}`),
}
export default schedulesApi
