import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userSession: null,
    respAPI: "https://europe-west1-st-testcase.cloudfunctions.net",
  },
  mutations: {},
  actions: {
    signUp() {},
  },
  modules: {},
});
