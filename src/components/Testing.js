import React from 'react'

const TestingButton = ({generation, setGameOngoing, setGameList}) => {
    // For testing purposes only, auto fills the board
  const autoFill = () => {
    setGameOngoing(true)
    let testArray = []
    generation.map((pokemon)=>{
      return testArray.push(pokemon.name.toLowerCase())
    })
    setGameList([...testArray])
  }
    return <button onClick={()=>autoFill()}>Test</button>
}

export default TestingButton