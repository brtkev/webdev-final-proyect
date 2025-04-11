<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-school-flag"></i> Manejo de Matriculaciones</span></h1>
    <Form :headers="headers" :entity="entity"></Form>
</template>

<script>

import { ref } from 'vue';
import Form from '@/components/Form/Form.vue';
import { getCollection, entities } from '@/Database/firestore.js';
export default {
    components: {
        Form
    },
    setup(){
        const entity = entities.matriculaciones;

        const asignaturas = ref([]);
        getCollection(entities.asignaturas).then( ( data ) => {
            asignaturas.value = data.map( ( item ) => {
                return { title: item.nombre, value: item.id};
            });
        });

        const estudiantes = ref([]);
        getCollection(entities.estudiantes).then( ( data ) => {
            estudiantes.value = data.map( ( item ) => {
                return { title: `${item.apellido} ${item.nombre} - ${item.cedula}` ,value: item.id};
            });
        });

        const headers = [
            { title: 'Estudiante', key: 'estudiante', isArray: true, items: estudiantes, isMultiple: false },
            { title: 'Asignaturas', key: 'asignaturas', isArray: true, items: asignaturas, isMultiple: true },
        ]
        return {
            headers,
            entity,
        }
    }
}
</script>