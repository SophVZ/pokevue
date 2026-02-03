<!--
Componente responsable de mostrar la información de un único Pokémon.
Props obligatorias:
Prop Tipo Descripción
name String Nombre del Pokémon
image String Imagen oficial
types Array Tipos del Pokémon
id Number Número de la Pokédex-->

<template>
<div class="d-flex justify-content-center">
    <div class="card shadow-sm py-2" style="width: 30rem;">
        <img :src="image" class="card-img-top p-3" :alt="name">
        <div class="card-body">
            <h5 class="card-title text-capitalize text-center">{{name}} {{pokemon.etiquetaEspecial}} (#{{id}})</h5>
            <hr>
            <p class="card-text"><strong>Tipos:</strong> {{types.join(', ')}}</p>
            <h6><strong>Físico:</strong></h6>
            <p class="card-text "><span class="fw-semibold">Peso:</span> {{pokemon.peso}}</p>
            <p class="card-text"><span class="fw-semibold">Altura:</span> {{pokemon.altura}}</p>
            <h6><strong>Estadísticas Base:</strong></h6>
            <div class="col-rows d-flex flex-column pb-3">
                <small class="col"><span class="fw-semibold">HP:</span> {{pokemon.hp}} | <span class="fw-semibold">ATK:</span> {{pokemon.ataque}} | <span class="fw-semibold">DEF:</span> {{pokemon.defensa}}</small>
                <small class="col"><span class="fw-semibold">ATK-SP:</span> {{pokemon.ataqueEspecial}} | <span class="fw-semibold">DEF-SP:</span> {{pokemon.defensaEspecial}}</small>
                <small class="col"><span class="fw-semibold">VEL:</span> {{pokemon.velocidad}}</small>
            </div>
            <h6><strong>Habilidades:</strong></h6>
            <p class="card-text">{{pokemon.habilidades}}</p>
            <h6><strong>Movimientos:</strong></h6>
            <p class="card-text">{{pokemon.movimientos}}</p>
        </div>
    </div>
</div>
</template>

<script setup>
    import Pokemon from '../models/clase-pokemon.js'
    import {onMounted} from 'vue';

    const props = defineProps({
        pokemon: {type: Pokemon, required: true},
        name: {type: String, required: true},
        image: {type: String, required: true},
        types: {type: Array, required: true},
        id: {type: Number, required: true}
    })
    onMounted(()=>{
        props.pokemon.reproducirGrito();
    })
</script>

<style scoped>
</style>