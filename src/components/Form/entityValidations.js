import { collection, getDocs, } from "firebase/firestore/lite";
import { db, entities, getCollection } from "@/Database/firestore.js";


/** VALIDACIONES BACKEND */
export async function validateBeforeRequest({entity, data}){

    /** STATUS VALIDO */
    let resultObject = {
        'status': true,
        'message': ''
    }

    /** STATUSES ERROR */
    /** ESTUDIANTES NO DUPLICADOS */
    if(entity === entities.estudiantes){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.cedula == data.cedula)){
            resultObject = {
                'status': false,
                'message': 'La cedula ya existe'
            };
        };
        
    /**ASIGNATURAS NO DUPLICADAS */
    } else if( entity === entities.asignaturas){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.nombre == data.nombre)){
            resultObject = {
                'status': false,
                'message': 'Esa asignatura ya existe'
            };
        };
    /** MATRICULAS NO DUPLICADAS */
    }else if( entity === entities.matriculaciones){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.estudiante == data.estudiante)){
            resultObject = {
                'status': false,
                'message': 'Ya existe una matricula para ese estudiante'
            };
        };

    /** CALIFICACIONES NO DUPLICADAS */
    }else if (entity === entities.calificaciones) {
        const matriculacionesDataList = await getCollection(entities.matriculaciones);
        const dataList = await getCollection(entity);
        if (dataList.some(item => item.estudiante == data.estudiante && item.asignatura == data.asignatura)) {
            resultObject = {
                'status': false,
                'message': 'Ya existe una calificacion para ese estudiante y asignatura'
            };

        /** CALIFICACIONES ESTUDIANTE DEBE TENER MATRICULA */
        }else {
            const matriculaIndex = matriculacionesDataList.findIndex( item => item.estudiante == data.estudiante);
            if(matriculaIndex === -1){
                resultObject = {
                    'status': false,
                    'message': 'El estudiante no tiene matricula'
                };

            /** CALIFICACIONES ASIGNATURA DEBE ESTAR MATRICULADA AL ESTUDIANTE */
            }else if(!matriculacionesDataList[matriculaIndex].asignaturas.some( item => item == data.asignatura)){
                resultObject = {
                    'status': false,
                    'message': 'El estudiante no tiene matricula para esa asignatura'
                };
            }
        }
    }
    
    return resultObject;
}