<!-- DEF TITULO Y FORMULARIO -->
<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-school-flag"></i> Manejo de
            Matriculaciones</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateClick"></Form>
</template>

<script>
/** IMPORTES */
import Form from '@/components/Form/Form.vue';
import { entities } from '@/Database/firestore.js';
import { asignaturas, refreshAsignaturas, estudiantes, refreshEstudiantes, estudianteIsDisabled, asignaturasIsDisabled, onUpdateEstudianteModel, afterRequest, onUpdateClick } from './HandleEstudiantesYAsignaciones.js'



/** ENTIDAD DE LA VISTA */
const entity = entities.matriculaciones;

/** HEADERS */
const headers = [
    { title: 'Estudiante', key: 'estudiante', isArray: true, items: estudiantes, isMultiple: false, onUpdateModelValue: onUpdateEstudianteModel, isDisabled: estudianteIsDisabled },
    { title: 'Asignaturas', key: 'asignaturas', isArray: true, items: asignaturas, isMultiple: true, isDisabled: asignaturasIsDisabled },
]
export default {
    components: {
        Form
    },
    setup() {
        /** FORM DEFAULT STATE */
        estudianteIsDisabled.value = false;
        asignaturasIsDisabled.value = true;

        /** refresca los hooks */
        Promise.all([
            refreshAsignaturas(),
            refreshEstudiantes()
        ])


        return {
            headers,
            entity,
            afterRequest,
            onUpdateClick
        }
    }
}
</script>