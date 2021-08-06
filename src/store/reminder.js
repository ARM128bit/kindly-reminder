const state = {
  reminderURL: "/api/reminders",
  reminders: null,
  isLoading: false,
};

const getters = {
  userReminders(state) {
    return state.reminders;
  },
};
const mutations = {
  refreshUserReminders(state, payload) {
    state.reminders = [...payload];
  },
};
const actions = {
  loadUserReminders({ rootState, state, commit }) {
    state.isLoading = true;
    fetch(
      `${rootState.respAPI}${state.reminderURL}?userId=${localStorage.getItem(
        "jwt"
      )}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      })
      .then((json) => {
        commit("refreshUserReminders", json);
      })
      .catch(function (error) {
        // catch
        console.log("Request failed", error);
      })
      .finally(() => {
        state.isLoading = false;
      });
  },
};
export default { state, getters, mutations, actions };
