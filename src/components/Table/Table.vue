<template>
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
</template>

<script>

export default {
    name: 'Table',
    props: {
        tableHeaders: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
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
        const updateItem = (item) => {
            props.onUpdateItem(item);
        }

        const deleteItem = (item) => {
            props.onDeleteItem(item);
        }

        return {
            updateItem,
            deleteItem
        }
    }
}
</script>