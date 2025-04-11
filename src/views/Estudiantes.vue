<script >
import { ref } from 'vue';
import Form from '@/components/Form/Form.vue'
import { getCollection, entities } from '@/Database/firestore.js';


export default {
    components: {
        Form
    },
    setup(){
        const carreras = ref([]);
        getCollection(entities.carreras).then( ( data ) => {
            carreras.value = data.map( ( item ) => {
                return item.id;
            });
        });
        
        const cedulaIsDisabled = ref(false);

        const headers = [
            { title: 'Nombre', key: 'nombre' },
            { title: 'Apellido', key: 'apellido' },
            { title: 'Cedula', key: 'cedula', sortable: true, isDisabled: cedulaIsDisabled },
            { title: 'Carrera', key: 'carreras', isArray: true, items: carreras, isMultiple: true },
        ]
        const entity = entities.estudiantes; 
        
        const onUpdateClick = (item) => {
            cedulaIsDisabled.value = true;
        }

        const afterRequest = (method, item) => {
            if(["PUT", "CANCEL"].includes(method) ){
                cedulaIsDisabled.value = false;
            }
        }
        return { headers, entity, afterRequest, onUpdateClick };
    }
}
</script>

<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-user-graduate"></i> Manejo de Estudiantes</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateClick"></Form>
</template>

