  // dynamic slicer function


  export const dynamicslicer = (generation, increment) => {
    let pokemonGroup = [];
    pokemonGroup = [];
    for(let i = 0; i < generation.length; i++) {
      if(i % increment === 0) {
        pokemonGroup.push(generation.slice(i, i + increment))
      }
    }
    return pokemonGroup
  }