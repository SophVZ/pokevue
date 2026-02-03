
import {Pokemon} from '../models/clase-pokemon.js';

export async function obtenerPokemon(nombreOId) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOId.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");
    const data = await response.json();
    return new Pokemon(data);
}