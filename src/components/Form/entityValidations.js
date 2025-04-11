import { collection, getDocs, } from "firebase/firestore/lite";
import { db } from "@/Database/firestore.js";
// import { entity as estudiantesEntity } from "@/views/Estudiantes.vue";

export async function validateBeforeRequest({entity, data}){

    if(entity === "estudiantes"){
        const entityCollection = collection(db, estudiantesEntity);
        const entityDocs = await getDocs(entityCollection);
        const dataList = entityDocs.docs.map(doc => ({
            'id': doc.id,
            ...doc.data()
        }));

        

        if(dataList.some( item => item.cedula === data.cedula)){
            return {
                'status': false,
                'message': 'La cedula ya existe'
            };
        };
        
        
    }
    
    return {
        'status': true,
        'message': ''
    };
}