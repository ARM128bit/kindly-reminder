<template>
  <div class="simple-container_50">
    <div class="flex-item">
      <div class="flex-item_wrapper">
        <label>Описание</label>
        <input v-model="reminder.note" type="text" class="custom-text" />
      </div>
    </div>
    <div class="flex-item">
      <div class="flex-item_wrapper">
        <label>Дата напоминания</label>
        <input
          v-model="reminder.date"
          type="datetime-local"
          class="custom-text"
        />
      </div>
    </div>
    <div class="flex-item"></div>
    <div class="flex-item flex-item_right">
      <template v-if="reminder.id">
        <input type="button" value="Удалить" />
        <input type="button" value="Сохранить" />
      </template>
      <template v-else>
        <input type="button" value="Создать" @click="createReminder" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reminder",
  props: {
    reminder: {
      type: Object,
    },
  },
  methods: {
    createReminder() {
      this.$store
        .dispatch("createReminder", this.reminder)
        .then(() => this.$store.dispatch("loadReminders"))
        .then(() => (this.reminder = {}));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  font-weight: 600;
  text-align: left;
}
.simple-container_50 {
  width: 50%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 50% 50%;
  border: 1px solid black;
}
.custom-text {
  font-size: 12pt;
  width: 100%;
  padding: 5px;
  border: none;
  outline: none;
  border-bottom: 1px solid #d8d8d8;
  transition: border-bottom 0.5s;
}
.flex-item {
  display: flex;
  justify-content: left;
  padding: 5px;
  margin: 5px;
}
.flex-item_right {
  justify-content: flex-end;
}
.flex-item_wrapper {
  width: 100%;
}
.custom-text:focus {
  transition: border-bottom 0.5s;
  border-bottom: 1px solid #ff6600;
}
</style>
