<template>
  <div class="home">Домашняя страница</div>
</template>

<script>
// @ is an alias to /src
/*import CreationForm from "@/components/CreationForm.vue";*/

import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["userReminders", "userSession"]),
    ...mapState(["reminderStore"]),
  },
  components: {
    /*CreationForm,*/
  },
};
</script>
