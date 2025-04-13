<script setup>
import { ref, onMounted } from "vue";
import SidebarLink from "./SidebarLink.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./state.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/** MANEJA EL ESTADO LOGEADO/DESLOGEADO */
const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>
<!-- SIDEBAR DEFINITION -->
<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1 class="sidebar-title">
      <span v-if="collapsed">
        <div>M</div>
        <div>U</div>
      </span>
      <span v-else>Manejo Universitario</span>
    </h1>
    <nav>
      <SidebarLink to="/" icon="fas fa-home">Home</SidebarLink>
      <v-container class="nav-subcontainer" v-if="!isLoggedIn">
        <SidebarLink to="/sign-in" icon="fa-solid fa-sign-in"
          >Iniciar Sesion</SidebarLink
        >
        <SidebarLink to="/register" icon="fa-solid  fa-address-book"
          >Registrarse</SidebarLink
        >
      </v-container>
      <v-container class="nav-subcontainer" v-if="isLoggedIn">
        <SidebarLink to="/estudiantes" icon="fa-solid fa-user-graduate"
          >Estudiantes</SidebarLink
        >
        <SidebarLink to="/asignaturas" icon="fas fa-book-open"
          >Asignaturas</SidebarLink
        >
        <SidebarLink to="/matriculaciones" icon="fa-solid fa-school-flag"
          >Matriculaciónes</SidebarLink
        >
        <SidebarLink to="/calificaciones" icon="fa-solid fa-award"
          >Calificaciónes</SidebarLink
        >
        <SidebarLink to="/reportes" icon="fa-solid fa-laptop-file"
          >Reportes</SidebarLink
        >
      </v-container>
      <SidebarLink v-if="isLoggedIn" to="/log-out" icon="fa-solid  fa-sign-out"
        >Cerrar Sesion</SidebarLink
      >
    </nav>

    <span
      class="collapse-icon"
      @click="toggleSidebar"
      :class="{ 'rotate-180': collapsed }"
    >
      <i class="fas fa-angle-double-left"></i>
    </span>
  </div>
</template>

<style>
:root {
  --sidebar-bg-color: #2f855aee;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
}
</style>

<style scoped>
h1 {
  /* text-wrap: nowrap; */
  overflow: hidden;
  padding: 0 0.1em;
}

.sidebar {
  color: white;
  background-color: var(--sidebar-bg-color);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.7em;
  margin: 0;

  color: rgba(255, 255, 255, 0.7);

  transition: 0.2s linear;
  cursor: pointer;
}
.collapse-icon:hover {
  background-color: var(--sidebar-item-hover);
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

.sidebar-title {
  font-size: 1.5em;
}

.nav-subcontainer {
  margin: 0;
  padding: 0;
}
</style>
