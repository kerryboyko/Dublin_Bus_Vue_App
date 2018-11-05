import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import RoutePage from "@/views/RoutePage.vue";
import StopPage from "@/views/StopPage.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home-page",
      component: Home,
      children: [
        {
          path: "route/:routeFromUrl/",
          name: "route-page",
          component: RoutePage,
          props: true,
          children: [
            {
              path: "stop/:stopIdFromUrl/",
              name: "stop-page",
              component: StopPage,
              props: true
            }
          ]
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

export default router;
