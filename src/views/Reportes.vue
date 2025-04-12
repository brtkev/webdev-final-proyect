<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-laptop-file"></i> Generacion de Reportes</span></h1>
    <!-- <Form :headers="headers"></Form> -->
</template>

<script>

/** IMPORTES */
// import  from '@/components/Form/Form.vue';
import { entities, getCollection } from '@/Database/firestore.js';

/** GET ALL ENTITIES DATA */
const reportEntities = {
    estudiantes: {
        entity: entities.estudiantes,
        title: 'Estudiantes registrados',
        properties: {
            Nombre: 'nombre',
            Apellido: 'apellido',
            Cedula: 'cedula',
            Carrera: 'carreras'
        },
        icon: 'fa-solid fa-user-graduate'
    },
    asignaturas: {
        entity: entities.asignaturas,
        title: 'Asignaturas',
        properties: {
            Nombre: 'nombre',
            Semestre: 'semestre',
            Creditos: 'creditos',
            Carreras: 'carrera'
        },
        icon: 'fa-solid fa-book'
    },
    matriculaciones: {
        entity: entities.matriculaciones,
        title: 'Matriculaciones',
        properties: {
            Estudiante: 'estudiante',
            Asignaturas: 'asignaturas'
        },
        icon: 'fa-solid fa-school-flag'
    },
    calificaciones: {
        entity: entities.calificaciones,
        title: 'Calificaciones',
        properties: {
            Estudiante: 'estudiante',
            Asignatura: 'asignatura',
            Calificacion: 'calificacion'
        },
        icon: 'fa-solid fa-graduation-cap'
    },
}
Object.values(reportEntities).forEach( async ({entity, title, properties}) => {
    const collection = await getCollection(entity);

    console.log("=====================================");
    console.log(title + ` (${collection.length})`);
    collection.forEach((item) => { 
        if (properties){
            let msg = '';
            Object.entries(properties).forEach(([key, value]) => {
                msg += `${key}: ${item[value]} `;
            });
            console.log(msg)
        }
    })
});

export default {
    setup(){
        return {
        }
    }
}
</script>