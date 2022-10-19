
import React, {useState, useEffect} from 'react';
import TableData from './components/TableData';
import { pokemonList } from './pokemon-list';

import "./App.css"

export default function App() {

  const [userInput, setUserInput] = useState("");
  const [gameList, setGameList] = useState([]);
  const [gameOngoing, setGameOngoing] = useState(false);

  useEffect(() => {
    pokemonList.map((pokemon)=>{
      if(userInput.toLowerCase() === pokemon.name.toLowerCase()){
        if(gameList.length === 0){
          setGameList([...gameList, pokemon.name.toLowerCase()])
          setUserInput("")
          return null
        } else {
          if(gameList.includes(userInput.toLowerCase())){
            console.log(`${userInput} already exists in array`)
            return null
          } else {
            setGameList([...gameList, pokemon.name.toLowerCase()])
            setUserInput("")
            return null
          }
      } 
    }
    return null
  })}, [userInput, gameList])

  //counter
  useEffect(()=>{
    if(gameList === 151 && !gameOngoing){
      setGameOngoing(false)
    } else {
      // setGameOngoing(true)
    }
  }, [gameList, gameOngoing]
  )

  const pokemonGroup = [
    pokemonList.slice(0, 16),
    pokemonList.slice(16, 32),
    pokemonList.slice(32, 48),
    pokemonList.slice(48, 64),
    pokemonList.slice(64, 80),
    pokemonList.slice(80, 96),
    pokemonList.slice(96, 112),
    pokemonList.slice(112, 128),
    pokemonList.slice(128, 144),
    pokemonList.slice(144)
  ]



  const renderGameStatus = () => 
    gameOngoing 
      ? `${gameList.length} / 151`
      : gameList.length ? `You got ${gameList.length} out of 151. Start typing below to try again!` : "Start typing below to start new game"

    const renderButton = () =>
      !gameOngoing && gameList.length 
        ? <button onClick={()=>resetGame()}>Reset Game</button>
        : <button onClick={()=>endGame()} disabled={!gameOngoing}>End Game</button>


  const startNewGame = () => {
    setGameOngoing(true);
    setGameList([]);
  }

  const endGame = () => {
    //thanos says hi
    setGameOngoing(false);
    setUserInput("");
  }

  const resetGame = () => {
    setGameList([]);
    setGameOngoing(false);
    setUserInput("");
  }

  const handleOnChange = (value) => {
    setUserInput(value)
    if(!gameOngoing){
      startNewGame()
    }
  }

  // const autoFill = () => {
  //   setGameOngoing(true)
  //   console.log(pokemonList)
  //   pokemonList.map((pokemon)=>{
  //     setGameList([...gameList, pokemon.name.toLowerCase()])
  //     console.log(gameList)
  //     return null
  //   })
  // }  
  return (
    <div className="App">

      <div className="game-status">{renderGameStatus()}</div>
  
      <input 
        value={userInput}
        onChange={(e)=>handleOnChange(e.target.value)}
      />

      <table>
      {pokemonGroup.map((list)=>{ 
        return <tr>
          {list.map((pokemon)=>{
            return <TableData pokemon={pokemon} gameList={gameList} gameOngoing={gameOngoing}/>
          })}
        </tr>
      })}
      </table>

        {renderButton()}

        {/* <button onClick={()=>autoFill()}>Test</button> */}
    </div>
  );
};