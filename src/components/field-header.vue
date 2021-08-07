<template>
  <div>
    <label :for="elID" class="field-header" v-text="title"></label>
  </div>
</template>

<script>
export default {
  name: "field-header",
  props: {
    title: {
      type: String,
      required: true,
      default: "",
    },
    elID: {
      type: String,
      default: "",
    },
  },
  computed: {},
  methods: {},
  mounted() {},
  components: {},
};
</script>
<style scoped>
.field-header {
  font-size: 12px;
  color: grey;
  font-weight: 600;
}
</style>
