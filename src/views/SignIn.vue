<template>
  <div class="main-container">
    <h1 style="text-align: center">Iniciar Sesion</h1>
    <v-text-field v-model="email" :label="'Correo'"></v-text-field>
    <v-text-field v-model="password" :label="'Contraseña'"></v-text-field>
    <p v-if="errorMsg">{{ errorMsg }}</p>
    <div class="button-container">
      <v-btn class="button" @click="onSignIn">Iniciar Sesion</v-btn>
      <v-btn class="button" @click="onSignInWithGoogle"
        >Iniciar Sesión con Google</v-btn
      >
    </div>
  </div>
</template>
<script setup>
/** IMPORTS */
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";

/** HOOKS */
const router = useRouter();
const email = ref("");
const password = ref("");
const errorMsg = ref();
/** MANEJA EL LOG IN */
const onSignIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      router.push("/estudiantes");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error registering user:", errorCode, errorMessage);

      switch (errorCode) {
        case "auth/invalid-email":
          errorMsg.value = "El correo electrónico no es válido.";
          break;
        case "auth/user-not-found":
          errorMsg.value =
            "No se encontró un usuario con este correo electrónico.";
          break;
        case "auth/wrong-password":
          errorMsg.value = "La contraseña es incorrecta.";
          break;
        default:
          errorMsg.value = "Error al iniciar sesión. Inténtalo de nuevo.";
      }
    });
};
/** MANEJA EL LOG IN CON GOOGLE */
const onSignInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      const user = result.user;
      router.push("/estudiantes");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in with Google:", errorCode, errorMessage);
      switch (errorCode) {
        case "auth/popup-closed-by-user":
          errorMsg.value =
            "El popup fue cerrado antes de completar la autenticación.";
          break;
        case "auth/popup-blocked":
          errorMsg.value = "El popup fue bloqueado por el navegador.";
          break;
        default:
          errorMsg.value =
            "Error al iniciar sesión con Google. Inténtalo de nuevo.";
      }
    });
};
</script>

<style scoped>
.main-container {
  width: 500px;
  background-color: #2c3e50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 3em;
  margin-top: 10rem;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.button {
  margin-top: 1em;
  transition: 0.3s ease;
}

.button:hover {
  background-color: lightgreen;
  color: white;
  transform: scale(1.05);
}

@media only screen and (max-width: 768px) {
  /* Your CSS rules for small mobile devices/small tablets */

  .main-container {
    max-width: 350px;
  }
}
@media only screen and (max-width: 400px) {
  /* Your CSS rules for small mobile devices/small tablets */

  .main-container {
    max-width: 220px;
  }
}
</style>
