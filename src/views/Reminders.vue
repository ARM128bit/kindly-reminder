<template>
  <div class="home"></div>
</template>

<script>
// @ is an alias to /src
/*import CreationForm from "@/components/CreationForm.vue";*/

import { mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["userReminders"]),
    ...mapState(["reminderStore"]),
  },
  components: {
    /*CreationForm,*/
  },
};
</script>
