import Vue from "vue";
import Vuex from "vuex";
import authStore from "./auth";
import reminderStore from "./reminder";
import notificationStore from "./notification";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    respAPI: "https://europe-west1-st-testcase.cloudfunctions.net",
  },
  mutations: {},
  actions: {},
  modules: {
    authStore,
    reminderStore,
    notificationStore,
  },
});
