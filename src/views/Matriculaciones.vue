<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-school-flag"></i> Manejo de
            Matriculaciones</span></h1>
    <Form :headers="headers" :entity="entity" @after-request="afterRequest" @update-click="onUpdateClick" ></Form>
</template>

<script>

import { ref } from 'vue';
import Form from '@/components/Form/Form.vue';
import { getCollection, entities } from '@/Database/firestore.js';
export default {
    components: {
        Form
    },
    setup() {
        const entity = entities.matriculaciones;

        const ASIGNATURAS = [];
        const asignaturas = ref([]);
        getCollection(entities.asignaturas).then((data) => {
            data.forEach((item) => {
                ASIGNATURAS.push({ title: item.nombre, value: item.nombre, carreras: item.carrera, semestre: item.semestre });
            });
            asignaturas.value = ASIGNATURAS.sort((a, b) => {
                return a.title.localeCompare(b.title);
            });
        });

        const estudiantes = ref([]);
        getCollection(entities.estudiantes).then((data) => {
            estudiantes.value = data.map((item) => {
                return { title: `${item.apellido} ${item.nombre} - ${item.cedula}`, value: item.cedula, carreras: item.carreras };
            });
        });

        const estudianteIsDisabled = ref(false);
        const asignaturasIsDisabled = ref(true);


        const onUpdateEstudianteModel = (id) => {
            const estudiante = estudiantes.value.find(item => item.value === id);

            estudiante.carreras.forEach((carrera) => {
                asignaturas.value = ASIGNATURAS.filter((item) => {
                    
                    return item.carreras.includes(carrera) ;
                });
            });
            asignaturasIsDisabled.value = false;
            
        }

        const afterRequest = (method, item) =>{
            if(["POST", "PUT", "CANCEL"].includes(method) ){
                asignaturasIsDisabled.value = true;
                estudianteIsDisabled.value = false;
            }
        }

        const onUpdateClick = (item) => {
            asignaturasIsDisabled.value = false;
            estudianteIsDisabled.value = true;
        }

        const headers = [
            { title: 'Estudiante', key: 'estudiante', isArray: true, items: estudiantes, isMultiple: false, onUpdateModelValue: onUpdateEstudianteModel, isDisabled: estudianteIsDisabled },
            { title: 'Asignaturas', key: 'asignaturas', isArray: true, items: asignaturas, isMultiple: true, isDisabled: asignaturasIsDisabled },
        ]
        return {
            headers,
            entity,
            afterRequest,
            onUpdateClick
        }
    }
}
</script>