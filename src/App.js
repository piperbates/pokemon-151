
import React, {useState, useEffect} from 'react';
import Timer from './components/Timer/Timer';
import TableData from './components/TableData';
import { pokemonList } from './pokemonLists/pokemon-list';
import { pokemonGroup } from './pokemonLists/pokemon-list-slice';

import "./App.css"
// import TestingButton from './components/Testing';

export default function App() {

  const initialTimer = {initialMinutes: 15, initialSeconds: 0}

  const [userInput, setUserInput] = useState("");
  const [gameList, setGameList] = useState([]);
  const [gameOngoing, setGameOngoing] = useState(false);
  const [minutes, setMinutes] = useState(initialTimer.initialMinutes)
  const [seconds, setSeconds] = useState(initialTimer.initialSeconds)

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
    if(userInput.toLowerCase() === "nidoran"){// nidoran check
      addPokemon(["nidoran f", "nidoran m"]);
    }
    if(userInput.toLowerCase() === "mr mime"){// mr. mime check
      addPokemon(["mr. mime"]);
    }
    if(userInput.toLowerCase() === "farfetchd"){// farfetch'd check
      addPokemon(["farfetch'd"])
    }
    pokemonList.map((pokemon)=>{
      if(userInput.toLowerCase() === pokemon.name.toLowerCase()){
        addPokemon([pokemon.name.toLowerCase()]) 
    }
    return null
  })}, [userInput, gameList])

  //counter
  useEffect(()=>{
    if(gameList.length === 151 && gameOngoing){
      setGameOngoing(false)
    }
  }, [gameList, gameOngoing]
  )

  const renderGameStatus = () => 
    gameOngoing
      ? `You've got ${gameList.length} / 151 so far`
      : gameList.length 
          ? `You got ${gameList.length} out of 151. Play again?` 
          : "Start typing below to start new game"

    const renderButton = () =>
      !gameOngoing && gameList.length 
        ? <button onClick={()=>resetGame()}>Reset Game</button>
        : <button onClick={()=>endGame()} disabled={!gameOngoing} className={!gameOngoing ? "disabled" : null}>End Game</button>

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

  const handleOnChange = (value) => {
    setUserInput(value)
    if(!gameOngoing){
      startNewGame()
    }
  }

  return (
    <div className="app">
      <header>
        <h1>151 Pokémon Quiz</h1>
        <h2>Can you get all 151 Gen 1 Pokémon?</h2>
        <div className="game-status">{renderGameStatus()}</div>
        <div className="input-row">
          <input 
            autoFocus
            value={userInput}
            onChange={(e)=>handleOnChange(e.target.value)}
          />
          {renderButton()}
          {/* <TestingButton setGameList={setGameList} setGameOngoing={setGameOngoing} /> */}
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