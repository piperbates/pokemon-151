
import React, {useState, useEffect} from 'react';
import Timer from './components/Timer/Timer';
import TableData from './components/TableData';
import { dynamicslicer } from './pokemonLists/pokemon-list-slice';

import "./App.css"
import { pokemonGens } from './pokemonLists/pokemon-gen-slicer';
// import TestingButton from './components/Testing';

export default function App() {

  const initialTimer = {initialMinutes: 15, initialSeconds: 0}

  const [minutes, setMinutes] = useState(initialTimer.initialMinutes)
  const [seconds, setSeconds] = useState(initialTimer.initialSeconds)

  const [gameList, setGameList] = useState([]);
  const [generation, setGeneration] = useState(pokemonGens.gen1)
  const [pokemonGroup, setPokemonGroup] = useState(dynamicslicer(generation, 4))

  const [userInput, setUserInput] = useState("");
  const [gameOngoing, setGameOngoing] = useState(false);

  useEffect(()=>{
    setPokemonGroup(dynamicslicer(generation, 4))
  }, [generation])
  
// Game logic
  useEffect(() => {
    const addPokemon = (pokemon) => {
      if(gameList.length === 0){ // if the game list is empty, no duplicate checks need performing
        setGameList([...gameList, ...pokemon])
        console.log(pokemon + ' added')
        setUserInput("")
      } else { 
        if(gameList.includes(...pokemon)){// duplicate check
          console.log(`${userInput} already exists in array`)
        } else {
          setGameList([...gameList, ...pokemon])
          console.log(userInput + ' added')
          setUserInput("")
        }
    } 
  }
  if(generation === pokemonGens.gen1){
    if(userInput.toLowerCase() === "nidoran"){// nidoran check
      addPokemon(["nidoran f", "nidoran m"]);
    }
    if(userInput.toLowerCase() === "mr mime"){// mr. mime check
      addPokemon(["mr. mime"]);
    }
    if(userInput.toLowerCase() === "farfetchd"){// farfetch'd check
      addPokemon(["farfetch'd"])
    }}
    generation.map((pokemon)=>{
      if(userInput.toLowerCase() === pokemon.name.toLowerCase()){
        addPokemon([pokemon.name.toLowerCase()]) 
    }
    return null
  })}, [userInput, gameList, generation])

  // Pokemon Counter
  useEffect(()=>{
    if(gameList.length === generation.length && gameOngoing){
      setGameOngoing(false)
    }
  }, [gameList, gameOngoing, generation]
  )
    
  const startNewGame = () => {
    setMinutes(initialTimer.initialMinutes)
    setSeconds(initialTimer.initialSeconds)
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
    setMinutes(initialTimer.initialMinutes)
    setSeconds(initialTimer.initialSeconds)  
  }

  // Deals with user input
  const handleOnChange = (value) => {
    setUserInput(value)
    if(!gameOngoing){
      startNewGame()
    }
  }

  // Resets the game when the player selects a new gen
  const handleGenChange = (gen) => {
    resetGame()
    setGeneration(gen);
  }

  // --- RENDER ITEMS ---

  const renderGenName = () => {
    switch(generation){
      case pokemonGens.gen1:
        return "generation 1"
        case pokemonGens.gen2:
          return "generation 2"
        case pokemonGens.gen3:
          return "generation 3"
        case pokemonGens.gen4:
          return "generation 4"
        case pokemonGens.gen5:
          return "generation 5"
        case pokemonGens.gen6:
          return "generation 6"
        case pokemonGens.gen7:
          return "generation 7"
        case pokemonGens.gen8:
          return "generation 8"
        
      default:
        return null
    }
  }

  const renderGenerationOptions = () => {
    return (<div id="pokemon-game-selection-box">
      <p>Choose Pokémon Generation:</p>
      <button onClick={()=>{handleGenChange(pokemonGens.gen1)}}>Gen 1</button>
      <button onClick={()=>{handleGenChange(pokemonGens.gen2)}}>Gen 2</button>
    </div>)
  }

  const renderButton = () =>
      !gameOngoing && gameList.length 
        ? <button onClick={()=>resetGame()}>Reset Game</button>
        : <button onClick={()=>endGame()} disabled={!gameOngoing} className={!gameOngoing ? "disabled" : null}>End Game</button>


  const renderGameStatus = () => 
  gameOngoing
    ? `You've got ${gameList.length} / ${generation.length} so far`
    : gameList.length 
        ? `You got ${gameList.length} out of ${generation.length}. Play again?` 
        : "Start typing below to start new game"


  return (
    <div className="app">
      <header>
        <h1>Pokémon Quiz</h1>
        <h2>Can you get all Pokémon?</h2>
        <div>
          Current gen: {renderGenName()}
        </div>
        {!gameOngoing
          ? renderGenerationOptions()
          : null
        }
        <div className="game-status">{renderGameStatus()}</div>
        <div className="input-row">
          <input 
            autoFocus
            value={userInput}
            onChange={(e)=>handleOnChange(e.target.value)}
          />
          {renderButton()}
          {/* <TestingButton generation={generation} setGameList={setGameList} setGameOngoing={setGameOngoing} /> */}
          <Timer 
            endGame={endGame} 
            gameOngoing={gameOngoing}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
            minutes={minutes}
            seconds={seconds}
          />
        </div>
      </header>
      <table>
        <tbody>
        {pokemonGroup.map((list, index)=>{ 
          return <tr key={`key-${index}`}>
            {list.map((pokemon)=>{
              return <TableData pokemon={pokemon} gameList={gameList} gameOngoing={gameOngoing} key={`key-${pokemon.dex}`}/>
            })}
          </tr>
        })}
        </tbody>
      </table>
    </div>
  );
};