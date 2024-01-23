import axios from 'axios'
// // eslint-disable-next-line import/no-cycle
// import store from '../store'

axios.defaults.baseURL = 'https://onlineexam-backend-production.up.railway.app/api'
axios.defaults.headers.get.Accept = 'application/json'
axios.defaults.headers.post.Accept = 'application/json'
axios.defaults.headers.put.Accept = 'application/json'
axios.defaults.headers.delete.Accept = 'application/json'
// axios.interceptors.request.use(config => {
//   const { token } = store.getters
//   if (token) {
//     // eslint-disable-next-line no-param-reassign
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
export default axios
