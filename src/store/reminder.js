import { IsEmptyReminder } from "/src/assets/shared";

const state = {
  reminderURL: "/api/reminders/",
  reminders: [],
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
        json.forEach((element) => {
          element.date = element.date.substring(0, 16);
          element.onAction = false;
        });
        commit("refreshUserReminders", json);
      })
      .catch(function (error) {
        commit("PUSH_ERROR", `Request failed ${error}`);
      })
      .finally(() => {
        state.isLoading = false;
      });
  },
  deleteReminder({ rootState, state, commit }, { id }) {
    return fetch(
      `${rootState.respAPI}${
        state.reminderURL
      }${id}?userId=${localStorage.getItem("jwt")}`,
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
      });
  },
  createReminder({ rootState, state }, payload) {
    if (!IsEmptyReminder(payload)) {
      state.reminders.push(payload);
      return fetch(
        `${rootState.respAPI}${state.reminderURL}?userId=${localStorage.getItem(
          "jwt"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(new Error("Пустые поля"));
      });
    }
  },
  updateReminder({ rootState, state }, payload) {
    if (!IsEmptyReminder(payload)) {
      return fetch(
        `${rootState.respAPI}${state.reminderURL}${
          payload.id
        }?userId=${localStorage.getItem("jwt")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(payload),
        }
      ).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.error);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject(new Error("Пустые поля"));
      });
    }
  },
};
export default { state, getters, mutations, actions };
