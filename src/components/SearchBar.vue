<template>
    <div class="p-3">
        <form @submit.prevent="enviarBusqueda" class="input-group mb-3 contenedor-busqueda">
        <input v-model="query" type="text" class="form-control"
        placeholder="Nombre o ID del Pokémon">
        <button class="btn btn-dark" type="submit">
            Buscar
        </button>
        </form>
        <p v-if="error" class="text-danger mt-2 small">{{ error }}</p>
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const query = ref('')
    const error = ref ('')

    const emit= defineEmits(['search'])
    const enviarBusqueda=()=>{
        error.value=''
        if (!query.value.trim()){
            error.value='Debes ingresar un nombre o ID.';
            return;
        }
        emit('search',query.value.trim())
    }
</script>

<style scoped>
    .form-control:focus{
        box-shadow:none;
        border-color:#ced4da;
    }

    .contenedor-busqueda{
        border-radius: 6px;
        transition: box-shadow 0.2s ease-in-out;
    }

    .contenedor-busqueda:focus-within{
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        border-radius: 6px;
    }

    .contenedor-busqueda:focus-within .form-control,
    .contenedor-busqueda:focus-within .btn {
        border-color: #86b7fe;
    }
</style>

<!--
Componente encargado exclusivamente de la búsqueda.
Comportamiento:
● Permite ingresar el nombre de un Pokémon
● Al enviar el formulario, emite un evento hacia Pokedex.vue
● No realiza llamadas a la API directamente
Eventos:
● Emite @search="handler" con el nombre del Pokémon
Validaciones:
● Si el campo está vacío, debe mostrar un mensaje de error
● No debe permitir búsquedas inválidas-->