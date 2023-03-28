import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RestoView from "../views/RestoView.vue";
import RestoDetailView from "../views/RestoDetailView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/restos",
      name: "restos",
      component: RestoView
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/restos/:id",
      name: "restos-show",
      component: RestoDetailView
    },
  ],
});

export default router;