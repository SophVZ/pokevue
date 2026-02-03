<template>
  <div class="pokedex">
    <!-- Parte superior -->
    <div class="pokedex-header">
        <div class="luz-grande" :class="{'parpadeo-azul':loading}"></div>
        <div class="luces-pequenas">
            <span class="luz roja"></span>
            <span class="luz amarilla"></span>
            <span class="luz verde"></span>
        </div>
    </div>
    <!-- Pantalla -->
    <div class="pantalla">
      <SearchBar @search="manejarBusqueda"/>
      <div v-if="loading" class="text-center my-3">
        <div class="spinner-border text-primary" role="status"></div>
        <p>Buscando en la base de datos...</p>
      </div>
      <p v-if="error" class="alert alert-warning">{{ error }}</p>
      <PokemonCard
        v-if="pokemon && !loading"
        :name="pokemon.nombre"
        :id="pokemon.id"
        :image="pokemon.imagen"
        :types="pokemon.tipos"
        :pokemon="pokemon"
        @pokemon-listo="hacerGrito"
      />
    </div>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  import PokemonCard from './components/PokemonCard.vue';
  import SearchBar from './components/SearchBar.vue';
  import { obtenerPokemon } from './services/fetch-logic.js';

  const pokemon=ref(null)
  const loading=ref(false)
  const error=ref(null)

  const manejarBusqueda =async (nombre)=>{
    loading.value=true
    error.value=null
    pokemon.value=null
    try {
      const resultado=await obtenerPokemon(nombre);
      pokemon.value=resultado
    } catch (err){
      error.value="Ese Pokémon no existe."
      console.error(err)
    } finally {
      loading.value=false
    }
  }

  const hacerGrito=()=>{
    if (pokemon.value){
      pokemon.value.reproducirGrito(0.1)
    }
  }
</script>


<style>
.parpadeo-azul{
  animation: pulse 1s infinite
}

@keyframes pulse {
  0% {opacity: 1;}
  50% {opacity: 0.4;}
  100% {opacity: 1;}
}

  body {
    background-color: #2c2c2c;
    font-family: Arial, sans-serif;
}
/* Carcasa */
.pokedex {
    width: 500px;
    margin: 40px auto;
    background-color: #d32f2f;
    border-radius: 20px;
    padding: 15px;
    box-shadow: 0 0 20px black;
}
/* Parte superior */
.pokedex-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.luz-grande {
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, #6ec6ff, #0288d1);
    border-radius: 50%;
    border: 3px solid white;
    margin-right: 10px;
}
.luces-pequenas .luz {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 5px;
}
.luz.roja { background-color: #f44336; }
.luz.amarilla { background-color: #ffeb3b; }
.luz.verde { background-color: #4caf50; }
/* Pantalla */
.pantalla {
    background-color: #e0f2f1;
    border-radius: 10px;
    padding: 15px;
    border: 4px solid #424242;
}
/* Tarjeta Pokémon */
.card {
    border-radius: 10px;
}
.pantalla-activa {
    box-shadow: 0 0 15px #00e5ff;
    transition: box-shadow 0.3s;
}
</style>
<!--
Responsabilidades:
● Contiene el estado principal de la aplicación
● Coordina la búsqueda del Pokémon
● Recibe la información desde la clase que consume la API
● Controla los estados de carga, error y resultado
● Recibir y reproducir sonido que emita el componente PokemonCard

Estados mínimos a manejar:
● pokemon → objeto con la información del Pokémon
● loading → boolean
● error → mensaje de error o null
Este componente:
● Renderiza SearchBar.vue
● Renderiza PokemonCard.vue solo si existe un Pokémon válido

-->
