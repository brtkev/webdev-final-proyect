<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-laptop-file"></i> Generacion de
            Reportes</span></h1>
    <div class="report-card" v-for="report in reportConfig">
        <h2 class="view-title"><span style="color: white;"><i :class="report.icon"></i> {{ report.title }} ({{ report.tableData.value.length }})</span></h2>
        <div >
            <ul>
                <li class="message-container" v-for="message in report.messages" :key="message">{{ message }}</li>
            </ul>
        </div>
        <Table :tableHeaders="report.headers" :tableData="report.tableData"></Table>
    </div>
</template>

<script>

/** IMPORTES */
import { ref, onMounted, reactive } from 'vue';
import Table from '@/components/Table/Table.vue';
import { entities, getCollection } from '@/database/firebase.js';
import {
    reportesEstudiantes,
    reportesAsignaturas,
    reportesMatriculacion,
    reportesCalificaciones
} from '../components/viewHandlers/HandleReportesMensajes.js';

/** CONFIGURACION DE REPORTE */
const reportConfig = [
    {
        tableData: ref([]),
        title: 'Estudiantes',
        headers: [
            { title: 'Nombre', key: 'nombre' },
            { title: 'Apellido', key: 'apellido' },
            { title: 'Cedula', key: 'cedula', sortable: true },
            { title: 'Carrera', key: 'carreras', isMultiple: true },
        ],
        icon: 'fa-solid fa-user-graduate',
        messages: reactive([])
    },
    {
        tableData: ref([]),
        title: 'Asignaturas',
        headers : [
            { title: 'Nombre', key: 'nombre', },
            { title: 'Semestre', key: 'semestre' },
            { title: 'Creditos', key: 'creditos', sortable: true },
            { title: 'Carreras', key: 'carrera', isMultiple: true },
        ],
        icon: 'fa-solid fa-book',
        messages: reactive([])
    },
    {
        tableData: ref([]),
        title: 'Matriculaciones',
        headers: [
            { title: 'Estudiante', key: 'estudiante'},
            { title: 'Asignaturas', key: 'asignaturas', isMultiple: true },
        ],
        icon: 'fa-solid fa-school-flag',
        messages: reactive([])
    },
    {
        tableData: ref([]),
        title: 'Calificaciones',
        headers: [
            { title: 'Estudiante', key: 'estudiante'},
            { title: 'Asignatura', key: 'asignatura'},
            { title: 'Calificacion', key: 'calificacion'},
        ],
        icon: 'fa-solid fa-graduation-cap',
        messages: reactive([])
    },
];



export default {
    components: {
        Table
    },
    setup(){

        onMounted( async () => {
            /** LLENA LAS COLECIONES */
            const collections = await Promise.all([
                getCollection(entities.estudiantes),
                getCollection(entities.asignaturas),
                getCollection(entities.matriculaciones),
                getCollection(entities.calificaciones)
            ]);
            for (let i = 0; i < reportConfig.length; i++) {
                reportConfig[i].tableData.value = collections[i];

            }

            for (let i = 0; i < reportConfig.length; i++) {
                let { tableData } = reportConfig[i];
                /** SE VACIAN LOS MENSAJES DE ANTEMANO */
                reportConfig[i].messages = [];

                /** SE MANEJAN LOS REPORTES PARA CADA ENTIDAD */
                if(i == 0){
                    reportesEstudiantes(reportConfig, i, tableData);
                }else if( i == 1){
                    reportesAsignaturas(reportConfig, i, tableData);
                }else if( i == 2){
                    reportesMatriculacion(reportConfig, i, tableData);
                }else if( i == 3){
                    reportesCalificaciones(reportConfig, i, tableData);
                }
            }

        })
        

        return {
            reportConfig
        }
    }
}
</script>

<style scoped>
.report-card{
    background-color: #2c3e50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;

    width: 600px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 3em;

    & li{
        list-style-type: none;
    }
}

.message-container{
    background-color: #34495e;
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 1em;
}

/* Styles for small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) {
    /* Your CSS rules for small mobile devices/small tablets */

    .report-card {
        max-width: 350px;
    }

}
@media only screen and (max-width: 400px) {
    /* Your CSS rules for small mobile devices/small tablets */

    .report-card {
        max-width: 220px;
    }

}
</style>