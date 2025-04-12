<template>
    <v-app class="form-container">

        <!--FORM CONTAINER -->
        <div v-for="(header, i) in headers" :key="i" style="margin-bottom: 1.5rem;">
            <v-select v-if="header.isArray" v-model="data[header.key]" :items="header.items" :label="header.title"
                :multiple="header.isMultiple" :disabled="header.isDisabled"
                @update:modelValue="header.onUpdateModelValue"></v-select>
            <v-number-input v-else-if="header.isNumber" v-model="data[header.key]" :label="header.title"
                :disabled="header.isDisabled" :max="header.max" :min="header.min"></v-number-input>
            <v-text-field v-else v-model="data[header.key]" :label="header.title"
                :disabled="header.isDisabled"></v-text-field>

        </div>
        <!-- ERROR LABEL -->
        <v-container v-if="isError" style="color: red;">
            {{ errorList.join(', ') }}
        </v-container>

        <!-- FORM BUTTONS -->
        <v-btn v-if="!isUpdate" @click="addItem" style="margin-bottom: 1.5rem;">Agregar</v-btn>
        <v-container v-else class="update-buttons-container">
            <v-btn class="form-button" style="margin-right: 1.5rem;" @click="saveUpdatedItem">Actualizar</v-btn>
            <v-btn class="form-button" @click="cancelUpdatedItem">Cancelar</v-btn>
        </v-container>

        <!-- FORM TABLE -->
        <v-data-table :headers="tableHeaders" :items="tableData" class="elevation-1">
            <template v-for="header in tableHeaders" :key="header.key" v-slot:[`item.${header.key}`]="{ item }">
                <template v-if="header.isArray === true && header.isMultiple === true">
                    {{ item[header.key]?.join(', ') }}
                </template>
                <template v-else-if="header.key === 'actions'">
                    <v-icon size="small" @click="updateItem(item)" style="padding-right: 2rem">
                        mdi-pencil
                    </v-icon>
                    <v-icon size="small" @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-else>
                    {{ item[header.key] }}
                </template>
            </template>
        </v-data-table>
    </v-app>
</template>

<script>
import { ref, onMounted, isRef } from 'vue'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';


import { validateBeforeRequest } from './entityValidations';

import { db } from '../../Database/firestore';
export default {
    props: {
        headers: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every(item => {
                    const required = item.hasOwnProperty('title') && item.hasOwnProperty('key');
                    if (item.isArray) {
                        return required && item.hasOwnProperty('items') && isRef(item.items);
                    } else {
                        return required;
                    }

                })
            }
        },
        entity: {
            type: String,
            required: true,
        },
        onAfterRequest: {
            type: Function,
            default: () => { }
        },
        onUpdateClick: {
            type: Function,
            default: () => { }
        }
    },
    setup(props) {
        /** default data */
        const emptyData = {};
        /** form state is for updating */
        const isUpdate = ref(false);
        /** for state is in error */
        const isError = ref(false);
        /** error messages */
        const errorList = ref([]);
        /** form data */
        const data = ref({ ...emptyData });
        let updateOriginalData = { ...emptyData };
        /** select genres */

        /** table data */
        const tableData = ref([]);

        props.headers.forEach((header, i) => {
            /** set empty data */
            if (header.isArray) {
                emptyData[header.key] = header.isMultiple ? [] : '';
            } else if (header.isNumber) {
                emptyData[header.key] = 0;
            } else {
                emptyData[header.key] = '';
            }

            /** set onUpdateModelValue default value to avoid warning*/
            if (!header.hasOwnProperty('onUpdateModelValue')) {
                props.headers[i].onUpdateModelValue = () => { };
            }

        });


        /** table headers */
        const headers = ref(props.headers);

        const tableHeaders = [...props.headers, { title: 'Acciones', key: 'actions' }];

        /** validate form state using the book hook, if error returns true */
        const validateData = () => {

            const addError = (i) => {
                errorList.value.push(`${props.headers[i].title} es requerido`);
                isError.value = true;
            }

            clearError();

            for (let i = 0; i < props.headers.length; i++) {
                const { key, isArray } = props.headers[i];
                const value = data.value[key];

                if (isArray && (!value || value.length < 1)) {
                    addError(i)
                } else if (value == "" || !value) {
                    addError(i)
                }
            }

            if (isError.value) return true
        }

        /**se me olvido escribir en español en los comentarios de arriba, upsis xd */

        /** limpia el estado de error del formulario */
        const clearError = () => {
            isError.value = false;
            errorList.value = [];
        }

        /** form state */
        /** state update */
        const setFormStateToUpdate = (item) => {
            data.value = item;
            updateOriginalData = {...item};
            
            isUpdate.value = true;
            clearError();
        }
        /** state create */
        const setFormStateToCreate = () => {
            isUpdate.value = false
            updateOriginalData = { ...emptyData };
            data.value = { ...emptyData };
            clearError();
        }

        /** 
         * - valida que el formulario este completo
         * - agrega a la tabla el libro del formalario al hacer click en agregar
         * - sube el libro a firestore
         */
        const addItem = async () => {
            if (validateData()) return;

            try {
                const { status, message } = await validateBeforeRequest({ entity: props.entity, data: data.value });


                if (!status) {
                    errorList.value.push(message);
                    isError.value = true;
                    return;
                }

                const docRef = await addDoc(collection(db, props.entity), data.value);
                data.value.id = docRef.id;
                tableData.value.push(data.value);

                props.onAfterRequest("POST", data.value);

                data.value = { ...emptyData };
                clearError();

            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }

        /** 
         * - elimina el libro de la tabla y de firestore
         */
        const deleteItem = async (item) => {
            const deletedData = await deleteDoc(doc(db, props.entity, item.id));
            tableData.value = tableData.value.filter(data => data.id != item.id);
            props.onAfterRequest("DELETE", item);
        }

        /** 
         * - asigna al formulario los datos del libro seleccionado
         * - cambia el estado del form a edicion (update)
         */
        const updateItem = (item) => {
            props.onUpdateClick(item);
            setFormStateToUpdate(item);
            clearError();
        }

        /**
         * - valida el formulario
         * - guarda los cambios hechos al libro
         * - de vuelve la tabla a estado de creacion (agregar)
         */
        const saveUpdatedItem = async () => {
            if (validateData()) return;

            const { id, ...bookInfo } = data.value;
            const updatedData = await updateDoc(doc(db, props.entity, id), bookInfo);
            props.onAfterRequest("PUT", data.value);
            setFormStateToCreate();
        }

        /**
         * - de vuelve la tabla a estado de creacion (agregar)
         */
        const cancelUpdatedItem = () => {
            props.onAfterRequest("CANCEL", data.value);
            const dataIndex = tableData.value.findIndex(data => data.id == updateOriginalData.id);
            const tableDataValue = tableData.value;
            tableDataValue[dataIndex] = updateOriginalData;
            tableData.value = tableDataValue;

            setFormStateToCreate();
        }



        /**
         * - llena la tabla con los libros
         */
        onMounted(async () => {
            const entityCollection = collection(db, props.entity);
            const entityDocs = await getDocs(entityCollection);
            const dataList = entityDocs.docs.map(doc => ({
                'id': doc.id,
                ...doc.data()
            }));

            dataList.forEach(data => {
                tableData.value.push(data)
            })
        })

        return { data, tableData, headers, tableHeaders, addItem, deleteItem, updateItem, isUpdate, saveUpdatedItem, cancelUpdatedItem, isError, errorList, validateData }
    }
}
</script>

<style scoped>
.update-buttons-container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 0px;
    padding: 0px;
    margin-bottom: 1.5rem;
}

.form-button {
    margin: 0;
    flex: 1;
}

.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 3em;
}


/* Styles for small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 600px) {
    /* Your CSS rules for small mobile devices/small tablets */

    .form-container {
        max-width: 300px;
    }

}
</style>