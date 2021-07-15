import axios from '../axios/axios'

const resultApi = {
  addResult: data => axios.post('/results', data),
}
export default resultApi
