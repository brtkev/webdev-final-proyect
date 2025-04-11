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
        
        const headers = [
            { title: 'Nombre', key: 'nombre' },
            { title: 'Apellido', key: 'apellido' },
            { title: 'Cedula', key: 'cedula', sortable: true },
            { title: 'Carrera', key: 'carrera', isArray: true, items: carreras, isMultiple: true },
        ]
        const entity = entities.estudiantes; 
        

        return { headers, entity };
    }
}
</script>

<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-user-graduate"></i> Manejo de Estudiantes</span></h1>
    <Form :headers="headers" :entity="entity"></Form>
</template>

