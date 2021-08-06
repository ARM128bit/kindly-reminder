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
  loadReminders({ rootState, state, commit }) {
    state.isLoading = true;
    return fetch(
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
        commit("PUSH_ERROR", `Request failed ${error}`);
      })
      .finally(() => {
        state.isLoading = false;
      });
  },
  deleteReminder({ state, commit }, payload) {
    let _reminder = state.reminders.find(payload);
    _reminder.onAction = true;
    return fetch(
      `${state.reminderURL}${state.reminderURL}${
        _reminder.id
      }?userId=${localStorage.getItem("jwt")}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      })
      .catch(function (error) {
        commit("PUSH_ERROR", `Request failed ${error}`);
      })
      .finally(() => {
        _reminder.onAction = true;
      });
  },
  createReminder({ state, commit }, payload) {
    return fetch(`${state.reminderURL}?userId=${localStorage.getItem("jwt")}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      })
      .catch(function (error) {
        commit("PUSH_ERROR", `Request failed ${error}`);
      });
  },
};
export default { state, getters, mutations, actions };
