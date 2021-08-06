import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Reminders from "../views/Reminders.vue";
import Auth from "../views/Auth.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reminders",
    name: "reminders",
    component: Reminders,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Auth",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/Auth",
        params: { nextUrl: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
