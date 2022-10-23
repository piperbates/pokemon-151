import React from 'react'
import { pokemonList } from '../pokemonLists/pokemon-list'

const TestingButton = ({setGameOngoing, setGameList}) => {
    // For testing purposes only, auto fills the board
  const autoFill = () => {
    setGameOngoing(true)
    let testArray = []
    pokemonList.map((pokemon)=>{
      return testArray.push(pokemon.name.toLowerCase())
    })
    setGameList([...testArray])
  }
    return <button onClick={()=>autoFill()}>Test</button>
}

export default TestingButton