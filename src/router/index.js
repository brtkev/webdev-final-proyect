import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/estudiantes",
      name: "estudiantes",
      component: () => import("../views/Estudiantes.vue"),
    },
    {
      path: "/asignaturas",
      name: "asignaturas",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Asignaturas.vue"),
    },
    {
      path: "/calificaciones",
      name: "calificaciones",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Calificaciones.vue"),
    },
    {
      path: "/matriculaciones",
      name: "matriculaciones",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Matriculaciones.vue"),
    },
    {
      path: "/reportes",
      name: "reportes",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Reportes.vue"),
    },
  ],
});

export default router
