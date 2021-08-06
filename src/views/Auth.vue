<template>
  <div class="auth">
    <template v-if="!userJWTToken">
      <div>
        Нажми для авторизации
        <input
          type="button"
          value="Авторизоваться"
          @click="logIn"
          :disabled="authStore.gettingLogged"
        />
      </div>
    </template>
    <template v-else>
      <div>
        <p>Здравствуй, {{ userName }}</p>
        <p>Если ты устал смотреть свои напоминания, нажми кнопку Выйти ниже</p>
        <input type="button" value="Выйти" @click="logOut" />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "auth",
  computed: {
    userJWTToken() {
      return localStorage.getItem("jwt");
    },
    userName() {
      return localStorage.getItem("name");
    },
    ...mapState(["authStore"]),
  },
  methods: {
    ...mapActions(["signUp", "signOut"]),
    logIn() {
      this.signUp().then(() => this.$router.push("/reminders"));
    },
    logOut() {
      this.signOut().then(() => this.$router.push("/"));
    },
  },
};
</script>
