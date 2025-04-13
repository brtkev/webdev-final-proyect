<!-- DEF TITULO Y FORMULARIO -->
<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-user-graduate"></i> Manejo de
            Estudiantes</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateClick"></Form>
</template>

<script >
/** IMPORTES */
import { ref } from 'vue';
import Form from '@/components/Form/Form.vue'
import { getCollection, entities } from '@/database/firebase.js';

/** ENTIDAD DE LA VISTA */
const entity = entities.estudiantes;

export default {
    components: {
        Form
    },
    setup(){
        /** DEF Y LLENA CARRERAS */
        const carreras = ref([]);
        getCollection(entities.carreras).then( ( data ) => {
            carreras.value = data.map( ( item ) => {
                return item.id;
            });
        });
        
        /** HOOKS PARA CONTROL DEL FORMULARIO */
        const cedulaIsDisabled = ref(false);

        /** HEADERS */
        const headers = [
            { title: 'Nombre', key: 'nombre' },
            { title: 'Apellido', key: 'apellido' },
            { title: 'Cedula', key: 'cedula', isNumber: true, min: 1, sortable: true, isDisabled: cedulaIsDisabled },
            { title: 'Carrera', key: 'carreras', isArray: true, items: carreras, isMultiple: true },
        ]
        
        /** MANEJA EL COMPORTAMIENTO DEL FORMULARIO AL ENTRAR EN MODO EDICION*/
        const onUpdateClick = (item) => {
            cedulaIsDisabled.value = true;
        }

        /** MANEJA EL COMPORTAMIENTO DEL FORMULARIO DESPUES DE TERMINAR UNA ACCION */
        const afterRequest = (method, item) => {
            if(["PUT", "CANCEL"].includes(method) ){
                cedulaIsDisabled.value = false;
            }
        }
        return { headers, entity, afterRequest, onUpdateClick };
    }
}
</script>



