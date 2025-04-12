import { collection, getDocs, } from "firebase/firestore/lite";
import { db, entities, getCollection } from "@/Database/firestore.js";


export async function validateBeforeRequest({entity, data}){

    let resultObject = {
        'status': true,
        'message': ''
    }

    if(entity === entities.estudiantes){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.cedula == data.cedula)){
            resultObject = {
                'status': false,
                'message': 'La cedula ya existe'
            };
        };
        
        
    } else if( entity === entities.asignaturas){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.nombre == data.nombre)){
            resultObject = {
                'status': false,
                'message': 'Esa asignatura ya existe'
            };
        };
    }else if( entity === entities.matriculaciones){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.estudiante == data.estudiante)){
            resultObject = {
                'status': false,
                'message': 'Ya existe una matricula para ese estudiante'
            };
        };
    }else if (entity === entities.calificaciones) {
        const dataList = await getCollection(entity);
        if (dataList.some(item => item.estudiante == data.estudiante && item.asignatura == data.asignatura)) {
            resultObject = {
                'status': false,
                'message': 'Ya existe una calificacion para ese estudiante y asignatura'
            };
        };
    }
    
    return resultObject;
}