<!-- DEF TITULO Y FORMULARIO -->
<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-book-open"></i> Manejo de Asignaturas</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateClick"></Form>
</template>

<script>
/** IMPORTES */
import { ref } from 'vue';
import Form from '@/components/Form/Form.vue';
import { getCollection, entities } from '@/database/firebase.js';

export default {
    components: {
        Form
    },
    setup(){
        /** ENTIDAD DE LA VISTA */
        const entity = entities.asignaturas;
        
        /** DEF Y LLENA SEMESTRES */
        const semestres = ref([]);
        getCollection(entities.semestres).then( ( data ) => {
            semestres.value = data.sort( ( a, b ) => {
                return a.index - b.index;
            }).map( ( item ) => {
                return item.id;
            });
        });

        /** DEF Y LLENA CARRERAS */
        const carreras = ref([]);
        getCollection(entities.carreras).then( ( data ) => {
            carreras.value = data.map( ( item ) => {
                return item.id;
            });
        });

        /** HOOKS PARA CONTROL DEL FORMULARIO */
        const nombreIsDisabled = ref(false);

        /** HEADERS */
        const headers = [
            { title: 'Nombre', key: 'nombre', isDisabled: nombreIsDisabled },
            { title: 'Semestre', key: 'semestre', isArray: true, items: semestres, isMultiple: false },
            { title: 'Creditos', key: 'creditos', isNumber: true, sortable: true },
            { title: 'Carreras', key: 'carrera', isArray: true, items: carreras, isMultiple: true },
        ]

        /** MANEJA EL COMPORTAMIENTO DEL FORMULARIO DESPUES DE TERMINAR UNA ACCION */
        const afterRequest = (method, item) => {
            if(["PUT", "CANCEL"].includes(method) ){
                nombreIsDisabled.value = false;
            }
        }

        /** MANEJA EL COMPORTAMIENTO DEL FORMULARIO AL ENTRAR EN MODOD EDICION*/
        const onUpdateClick = (item) => {
            nombreIsDisabled.value = true;
        }
        return {
            headers,   
            entity,
            afterRequest,
            onUpdateClick
        }
    }
}
</script>