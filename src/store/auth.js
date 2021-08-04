const state = {
  userSession: null,
  authURL: "/api/auth",
  requestHeaders: {
    method: "POST",
  },
};

const getters = {};
const mutations = {
  refreshUserSession(state, payload) {
    state.userSession = { ...payload };
  },
};
const actions = {
  signUp({ state, commit }) {
    fetch(state.authURL, requestHeaders)
      .then((response) => {
        response.json();
      })
      .then((json) => {
        commit("refreshUserSession", json);
      });
  },
};
export default { state, getters, mutations, actions };
