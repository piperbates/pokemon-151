import { pokemonGens } from "./pokemon-gen-slicer";
import { pokemonList } from "./pokemon-list"

  // dynamic slicer function

  export const pokemonGroup = [];

  export const dynamicslicer = (generation, increment) => {
    pokemonGroup = [];
    for(let i = 0; i < generation.length; i++) {
      if(i % increment === 0) {
        pokemonGroup.push(generation.slice(i, i + increment))
      }
    }
  }