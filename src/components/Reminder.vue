<template>
  <div class="simple-container_50">
    <flex-item>
      <template v-slot:content>
        <field-header :title="'Описание'" />
        <input v-model="reminderLocal.note" type="text" class="text-field" />
      </template>
    </flex-item>
    <flex-item>
      <template v-slot:content>
        <field-header :title="'Дата напоминания'" />
        <input
          v-model="reminderLocal.date"
          type="datetime-local"
          class="text-field"
        />
      </template>
    </flex-item>
    <flex-item>
      <template v-slot:content>
        <span v-if="hasDelayed" class="error">ПРОСРОЧЕНО</span>
      </template>
    </flex-item>
    <div class="flex-item justify_end">
      <template v-if="reminderLocal.id">
        <input
          :disabled="reminderLocal.onAction"
          type="button"
          value="Удалить"
          @click="deleteReminder"
        />
        <input
          :disabled="reminderLocal.onAction"
          type="button"
          value="Сохранить"
          @click="updateReminder"
        />
      </template>
      <template v-else>
        <input
          :disabled="reminderLocal.onAction"
          type="button"
          value="Создать"
          @click="createReminder"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { startTimer } from "/src/assets/shared";
export default {
  name: "Reminder",
  data() {
    return {
      reminderLocal: this.reminder,
    };
  },
  props: {
    reminder: {
      type: Object,
    },
  },
  computed: {
    hasDelayed() {
      return (
        new Date() > new Date(this.reminderLocal.date) &&
        this.reminderLocal.date !== ""
      );
    },
  },
  methods: {
    createReminder() {
      let _self = this;
      this.reminderLocal.onAction = true;
      this.$store
        .dispatch("createReminder", this.reminderLocal)
        .then(() => {
          this.$store.commit("PUSH_NOTIFICATION", `Напоминание создано`);
          this.reminderLocal.onAction = false;
          return this.$store.dispatch("loadReminders");
        })
        .then(() => {
          _self.$store.getters.userReminders.forEach((item) => {
            if (typeof item.timerID === "undefined") {
              startTimer(_self, item);
            }
          });
        })
        .then(() => (this.reminderLocal = {}))
        .catch((error) => {
          this.$store.commit("PUSH_ERROR", `Request failed ${error}`);
          this.reminderLocal.onAction = false;
        });
    },
    updateReminder() {
      let _self = this;
      this.reminderLocal.onAction = true;
      this.$store
        .dispatch("updateReminder", this.reminderLocal)
        .then(() => {
          this.$store.commit("PUSH_NOTIFICATION", `Напоминание обновлено`);
          return this.$store.dispatch("loadReminders");
        })
        .then(() => {
          _self.$store.getters.userReminders.forEach((item) => {
            if (typeof item.timerID === "undefined") {
              startTimer(_self, item);
            }
          });
        })
        .finally(() => {
          this.reminderLocal.onAction = false;
        });
    },
    deleteReminder() {
      let _self = this;
      if (
        confirm(`Вы точно уверены, что желаете удалить данное напоминание?`)
      ) {
        this.reminderLocal.onAction = true;
        this.$store
          .dispatch("deleteReminder", this.reminderLocal)
          .then(() => {
            this.$store.commit("PUSH_NOTIFICATION", `Напоминание удалено`);
            return this.$store.dispatch("loadReminders");
          })
          .then(() => {
            _self.$store.getters.userReminders.forEach((item) => {
              if (typeof item.timerID === "undefined") {
                startTimer(_self, item);
              }
            });
          })
          .catch((error) => {
            this.$store.commit("PUSH_ERROR", `Request failed ${error}`);
            this.reminderLocal.onAction = false;
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simple-container_50 {
  width: 50%;
  margin: 0 auto 5px;
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px solid black;
}
.field-header {
  font-size: 12px;
  color: grey;
  font-weight: 600;
}
</style>
