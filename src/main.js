import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FlexItem from "./components/flex-item.vue";
import FieldHeader from "./components/field-header.vue";
import Error from "./components/Error.vue";
import Notification from "./components/Notification.vue";

import "/src/assets/style.css";

Vue.component("flex-item", FlexItem);
Vue.component("field-header", FieldHeader);
Vue.component("error", Error);
Vue.component("notification", Notification);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
