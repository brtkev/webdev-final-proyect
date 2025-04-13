<script setup>
</script>

<template>
  <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-house"></i> Manejo Universitario</span></h1>
  <main class="main-container">
    <p class="paragraph-container">
      Este proyecto es una aplicación web orientada a la gestión académica universitaria, que
      permité gestionar estudiantes, asignaturas, matrículas y calificaciones. Además, permite generar reportes
      personalizados para facilitar la consulta de información.
    </p>
    <p class="paragraph-container">
      La aplicación está construida con Vue.js y utiliza Firebase Firestore como base de datos para almacenar
      la información. La interfaz de usuario es intuitiva y fácil de usar, lo que permite a los usuarios
      gestionar la información de manera eficiente.
    </p>
    <p class="paragraph-container">
      La aplicacion cuenta con una barra de navegación del lado izquierdo que permite acceder a las diferentes secciones
      de
      la aplicación.
    </p>
    <p class="paragraph-container">
      La aplicación está diseñada para ser escalable y flexible, lo que permite adaptarse a las necesidades
      cambiantes de la gestión académica universitaria. Además, cuenta con una interfaz de usuario
      responsiva que se adapta a diferentes dispositivos y tamaños de pantalla.
    </p>

  </main>
</template>
<style scoped>

.main-container{
  width: 600px;
}

.paragraph-container{
  margin: 2em;
  padding: 1em;
  border-radius: 8px;
  background-color: #2c3e50;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  color: #CCC;
}

.paragraph-container:hover{
  transform: scale(1.5);
  background-color: #34495e;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}


/* Styles for small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) {
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