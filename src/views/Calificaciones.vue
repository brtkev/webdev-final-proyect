<template>
    <h1 class="view-title"><span style="color: white;"><i class="fa-solid fa-award"></i> Manejo de Calificaciónes</span></h1>
    <Form :headers="headers"></Form>
</template>

<script>

export default {
    setup(){
        return {
            headers: [
                { title: 'Nombre', key: 'name' },
                { title: 'Autor', key: 'author' },
                { title: 'Año', key: 'year', sortable: true },
                { title: 'Género', key: 'genres', isArray: true, items: ['Ficción', 'No ficción', 'Ciencia ficción', 'Fantasía', 'Misterio', 'Biografía', 'Terror', 'Romance'] },
            ]
        }
    }
}
</script>