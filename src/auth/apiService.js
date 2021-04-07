import axios from "../axios/axios";

export default {
  methods: {
    async login(data) {
      return await axios.post("/users/login", data);
    },
    async logout() {
      return axios.post("/users/logout", null);
    },
    async checkToken() {
      return await axios.post("/checkToken", null);
    },
  },
};
