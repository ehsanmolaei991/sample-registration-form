import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/components/layout/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/views/RegisterView.vue"),
          beforeEnter: (to, from, next) => {
            const isRegistered = localStorage.getItem("registrationData");
            if (isRegistered) {
              next({ name: "dashboard" });
            } else {
              next();
            }
          },
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
          beforeEnter: (to, from, next) => {
            const isRegistered = localStorage.getItem("registrationData");
            if (!isRegistered) {
              next({ name: "home" });
            } else {
              next();
            }
          },
        },
        {
          path: "description",
          name: "description",
          component: () => import("@/views/DescriptionView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
