<template>
  <div class="home">
    <h3>Новое напоминание</h3>
    <Reminder :reminder="{ note: '', date: '', onAction: false }" />
    <h3>Ваши напоминания</h3>
    <template v-if="!reminderStore.isLoading">
      <Reminder
        v-for="(item, index) in userReminders"
        :reminder="item"
        v-bind:key="index"
      />
    </template>
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
    remindersHeader() {
      if (this.reminderStore.isLoading) {
        return "Ваши напоминания загружаются";
      }
      if (this.userReminders.length == 0) {
        return "У вас ещё нет напоминаний. Вы можете создать свое первое напоминание в форме выше";
      }
      return "Ваши напоминания";
    },
  },
  components: {
    Reminder,
  },
  mounted() {
    this.$store.dispatch("loadReminders");
  },
};
</script>
