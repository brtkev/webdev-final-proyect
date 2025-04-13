import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/estudiantes",
      name: "estudiantes",
      component: () => import("../views/Estudiantes.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/asignaturas",
      name: "asignaturas",
      component: () => import("../views/Asignaturas.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/calificaciones",
      name: "calificaciones",
      component: () => import("../views/Calificaciones.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/matriculaciones",
      name: "matriculaciones",
      component: () => import("../views/Matriculaciones.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/reportes",
      name: "reportes",
      component: () => import("../views/Reportes.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        notAccessableWhileLoggedIn: true,
      },
    },
    {
      path: "/sign-in",
      name: "signin",
      component: () => import("../views/SignIn.vue"),
      meta: {
        notAccessableWhileLoggedIn: true,
      },
    },
    {
      path: "/log-out",
      name: "logout",
      component: () => import("../views/LogOut.vue"),
    },
  ],
});

/** AWITS FOR FIREBASE TO GIVE BACK THE USER */
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
}

/** ROUTE AUTHENTICATION PROTECTION */
router.beforeEach( async (to, from, next) => {
  
  if( to.matched.some(record => record.meta.requiresAuth)){
    if (await getCurrentUser()) {
      next();
    } else {
      alert("Debes iniciar sesión para acceder a esta página.");
      next("/sign-in");
    }
  }else if (to.matched.some((record) => record.meta.notAccessableWhileLoggedIn)) {
    if (await getCurrentUser()) {
      alert("Ya has iniciado sesión, no puedes acceder a esta página.");
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
