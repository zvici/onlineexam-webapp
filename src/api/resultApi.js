import axios from '../axios/axios'

const resultApi = {
  addResult: data => axios.post('/results', data),
  getResultByUser: id => axios.get(`/results/user/${id}`),
}
export default resultApi
