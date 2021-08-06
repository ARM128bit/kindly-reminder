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
    state.gettingLogged = true;
    return fetch(`${rootState.respAPI}${state.authURL}`, state.requestHeaders)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      })
      .then((json) => {
        commit("refreshUserSession", json);
      })
      .catch((error) => {
        commit("PUSH_ERROR", `Login request failed ${error}`);
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
