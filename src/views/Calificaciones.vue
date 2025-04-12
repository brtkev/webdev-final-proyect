<!-- DEF TITULO Y FORMULARIO -->
<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-school-flag"></i> Manejo de
            Matriculaciones</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateCalificacionesClick"></Form>
</template>


<script>
/** IMPORTES */
import Form from '@/components/Form/Form.vue';
import { entities } from '@/Database/firestore.js';
import { asignaturas, refreshAsignaturas, estudiantes, refreshEstudiantes, estudianteIsDisabled, asignaturasIsDisabled, onUpdateEstudianteModel, afterRequest, onUpdateClick } from './HandleEstudiantesYAsignaciones.js'



/** ENTIDAD DE LA VISTA */
const entity = entities.calificaciones;

/** MANEJA EL COMPORTAMIENTO DEL FORMULARIO AL ENTRAR EN MODOD EDICION*/
const onUpdateCalificacionesClick = (item) => {
    onUpdateClick(item);
    asignaturasIsDisabled.value = true;
}

/** HEADERS */
const headers = [
    { title: 'Estudiante', key: 'estudiante', isArray: true, items: estudiantes, isMultiple: false, onUpdateModelValue: onUpdateEstudianteModel, isDisabled: estudianteIsDisabled },
    { title: 'Asignatura', key: 'asignatura', isArray: true, items: asignaturas, isMultiple: false, isDisabled: asignaturasIsDisabled },
    { title: 'Calificacion', key: 'calificacion', isNumber: true, max: 20, min: 0 },
]

export default {
    components: {
        Form
    },
    setup() {
        /** refresca los hooks */
        refreshAsignaturas();
        refreshEstudiantes();
        return {
            headers,
            entity,
            afterRequest,
            onUpdateCalificacionesClick
        }
    }
}
</script>