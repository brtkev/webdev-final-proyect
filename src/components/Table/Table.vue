<template>
    <v-data-table :headers="tableHeaders" :items="tableData" class="elevation-1">
        <template v-for="header in tableHeaders" :key="header.key" v-slot:[`item.${header.key}`]="{ item }">
            <template v-if="header.isMultiple">
                {{ item[header.key]?.join(', ') }}
            </template>
            <template v-else-if="header.key === 'actions'">
                <div class="actions-container">
                    <button v-tooltip="`Actualizar`">
                        <v-icon class="action-button" size="small" @click="updateItem(item)"
                            style="margin-right: 0.75rem">
                            mdi-pencil
                        </v-icon>
                    </button>
                    <button v-tooltip="`Eliminar`">
                        <v-icon class="action-button" size="small" @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </button>
                </div>
            </template>
            <template v-else>
                {{ item[header.key] }}
            </template>
        </template>
    </v-data-table>
</template>

<script>
import { ref, isRef, reactive, isReactive } from 'vue';
export default {
    name: 'Table',
    props: {
        tableHeaders: {
            type: Array,
            required: true
        },
        tableData: {
            required: true
        },
        onUpdateItem: {
            type: Function,
            required: false,
            default: (item) => {
                console.warn('No update function provided.')
            }
        },
        onDeleteItem: {
            type: Function,
            required: false,
            default: (item) => {
                console.warn('No delete function provided.')
            }
        }
    },
    setup(props) {

        /** TABLE DATA */
        const tableHeaders = props.tableHeaders;
        let tableData = isReactive(props.tableData) ? props.tableData : reactive(props.tableData);
        
        const updateItem = (item) => {
            props.onUpdateItem(item);
        }

        const deleteItem = async (item) => {
            props.onDeleteItem(item);
        }

        return {
            tableHeaders,
            tableData,
            updateItem,
            deleteItem
        }
    }
}
</script>

<style scoped>
.actions-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.action-button{
    color: #2c3e50;
    cursor: pointer;
    transition: 0.3s ease;
    padding: 1em;
}

.action-button:hover{
    background-color: #2c3e50;
    color: white;
    transform: scale(1.2);
}
</style>