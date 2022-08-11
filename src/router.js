import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  //mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/",
      name: "layouts",
      component: () => import("./components/layouts/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("./views/About.vue"),
        },
      ],
    },
  ],
});
