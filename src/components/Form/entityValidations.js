import { collection, getDocs, } from "firebase/firestore/lite";
import { db, entities, getCollection } from "@/Database/firestore.js";


export async function validateBeforeRequest({entity, data}){

    if(entity === entities.estudiantes){
        const dataList = await getCollection(entity);

        if(dataList.some( item => item.cedula === data.cedula)){
            return {
                'status': false,
                'message': 'La cedula ya existe'
            };
        };
        
        
    } else if( entity === entities.asignaturas){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.nombre === data.nombre)){
            return {
                'status': false,
                'message': 'Esa asignatura ya existe'
            };
        };
    }else if( entity === entities.matriculaciones){
        const dataList = await getCollection(entity);
        if(dataList.some( item => item.estudiante === data.estudiante)){
            return {
                'status': false,
                'message': 'Ya existe una matricula para ese estudiante'
            };
        };
    }
    
    return {
        'status': true,
        'message': ''
    };
}