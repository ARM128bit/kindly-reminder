const state = {
  errorsList: [],
  notificationList: [],
  errorMessage: "",
  notificationMessage: "",
  delayTimeout: 15000,
  errorTimeoutID: null,
  notificationTimeoutID: null,
};
const getters = {
  errorMessage(state) {
    return state.errorMessage;
  },
  notificationMessage(state) {
    return state.notificationMessage;
  },
};
const mutations = {
  PUSH_ERROR: (state, payload) => {
    state.errorsList.push({
      description: payload,
      date: new Date().toLocaleDateString(),
    });
    state.errorMessage = payload;
    clearTimeout(state.errorTimeoutID);
    state.errorTimeoutID = setTimeout(function () {
      state.errorMessage = "";
    }, state.delayTimeout);
  },
  PUSH_NOTIFICATION: (state, payload) => {
    state.notificationList.push({
      description: payload,
      date: new Date().toLocaleDateString(),
    });
    state.notificationMessage = payload;
    clearTimeout(state.notificationTimeoutID);
    state.notificationTimeoutID = setTimeout(function () {
      state.notificationMessage = "";
    }, state.delayTimeout);
  },
};
const actions = {};
const modules = {};

export default {
  getters,
  state,
  mutations,
  actions,
  modules,
};
