export default {
  state: {
    isAuthenticated: localStorage.getItem("isAuthenticated") ? true : false,
    userData: localStorage.getItem("userData")
      ? localStorage.getItem("userData")
      : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  },
  getters: {
    token: (state) => {
      return state.token;
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    userData: (state) => {
      return state.userData;
    },
  },
  mutations: {
    setAuthenticated(state, payload) {
      localStorage.setItem("isAuthenticated", payload.isAuthenticated);
      state.isAuthenticated = payload.isAuthenticated;
      localStorage.setItem("userData", JSON.stringify(payload.userData));
      state.userData = payload.userData;
      localStorage.setItem("token", payload.userData.token);
      state.token = payload.userData.token;
    },
    removeAuthentication(state) {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
    },
  },
};
