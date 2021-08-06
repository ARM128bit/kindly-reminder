const state = {
  authURL: "/api/auth",
  requestHeaders: {
    method: "POST",
  },
  gettingLogged: false,
};

const getters = {};
const mutations = {
  logOff() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
  },
  refreshUserSession(state, payload) {
    localStorage.setItem("name", payload.name);
    localStorage.setItem("jwt", payload.id);
  },
};
const actions = {
  signUp({ rootState, state, commit }) {
    state.isLoging = true;
    return fetch(`${rootState.respAPI}${state.authURL}`, state.requestHeaders)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        commit("refreshUserSession", json);
      })
      .finally(() => {
        state.gettingLogged = false;
      });
  },
  signOut({ commit }) {
    return new Promise((resolve) => {
      commit("logOff");
      resolve();
    });
  },
};
export default { state, getters, mutations, actions };
