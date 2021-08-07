<template>
  <div class="v-snack v-snack--bottom">
    <div class="v-snack__wrapper info">
      <div class="v-snack__content">
        <span>{{ notificationStore.notificationMessage }}</span>
      </div>
    </div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
