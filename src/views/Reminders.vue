<template>
  <div class="home">
    <h3>Ваши напоминания</h3>
    <Reminder :reminder="{ note: '', date: '' }" />
    <Reminder
      v-for="(item, index) in userReminders"
      :reminder="item"
      v-bind:key="index"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Reminder from "@/components/Reminder.vue";

import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["userReminders"]),
    ...mapState(["reminderStore"]),
  },
  components: {
    Reminder,
  },
  mounted() {
    this.$store.dispatch("loadReminders");
  },
};
</script>
