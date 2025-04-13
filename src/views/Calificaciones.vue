<!-- DEF TITULO Y FORMULARIO -->
<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-school-flag"></i> Manejo de
            Matriculaciones</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateCalificacionesClick"></Form>
</template>


<script>
/** IMPORTES */
import Form from '@/components/Form/Form.vue';
import { entities, getCollection } from '@/Database/firestore.js';
import { asignaturas, refreshAsignaturas, estudiantes, refreshEstudiantes, estudianteIsDisabled, asignaturasIsDisabled, onUpdateEstudianteModel, afterRequest, onUpdateClick } from '../components/viewHandlers/HandleEstudiantesYAsignaciones.js'



/** ENTIDAD DE LA VISTA */
const entity = entities.calificaciones;

/** DEF MATRICULACIONES */
let matriculacionesData = [];


/** MANEJA EL COMPORTAMIENTO DEL FORMULARIO AL ENTRAR EN MODOD EDICION*/
const onUpdateCalificacionesClick = (item) => {
    onUpdateClick(item);
    asignaturasIsDisabled.value = true;
}

/** FILTRA ASIGNATURAS DESPUES DE SELECCIONAR ESTUDIANTE */
function onUpdateCalificacionesEstudianteModel(id){
    onUpdateEstudianteModel(id);
    asignaturas.value = asignaturas.value.filter((item) => matriculacionesData.some((matricula) => matricula.estudiante == id && matricula.asignaturas.includes(item.value) ));
}

/** HEADERS */
const headers = [
    { title: 'Estudiante', key: 'estudiante', isArray: true, items: estudiantes, isMultiple: false, onUpdateModelValue: onUpdateCalificacionesEstudianteModel, isDisabled: estudianteIsDisabled },
    { title: 'Asignatura', key: 'asignatura', isArray: true, items: asignaturas, isMultiple: false, isDisabled: asignaturasIsDisabled },
    { title: 'Calificacion', key: 'calificacion', isNumber: true, max: 20, min: 0 },
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
        ]).then( async () => {
            
            /** DEF Y LLENA MATRICULACIONES */
            matriculacionesData = await getCollection(entities.matriculaciones);

            /** FILTRA ESTUDIANTES POR MATRICULA */
            estudiantes.value = estudiantes.value.filter((item) => matriculacionesData.some( (matricula) =>  item.value == matricula.estudiante))

        })





        return {
            headers,
            entity,
            afterRequest,
            onUpdateCalificacionesClick
        }
    }
}
</script>