<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reminders">Reminders</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/Auth">Auth</router-link>
    </div>
    <router-view />
    <error v-if="notificationStore.errorMessage"></error>
    <notification v-if="notificationStore.notificationMessage"></notification>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Notification",
  computed: {
    ...mapState(["notificationStore"]),
  },
  methods: {},
  components: {},
  mounted() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
