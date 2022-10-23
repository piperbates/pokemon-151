
import React, {useState, useEffect} from 'react';
import TableData from './components/TableData';
import { pokemonList } from './pokemonLists/pokemon-list';
import { pokemonGroup } from './pokemonLists/pokemon-list-slice';

import "./App.css"
import TestingButton from './components/Testing';

export default function App() {

  const [userInput, setUserInput] = useState("");
  const [gameList, setGameList] = useState([]);
  const [gameOngoing, setGameOngoing] = useState(false);

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
    if(userInput.toLowerCase() === "farfetchd"){// farfetch'd check
      addPokemon(["farfetch'd"])
    }
    pokemonList.map((pokemon)=>{
      if(userInput.toLowerCase() === pokemon.name.toLowerCase()){
        addPokemon([pokemon.name.toLowerCase()]) 
    }
    return null
  })}, [userInput, gameList])

  console.log(gameList)

  //counter
  useEffect(()=>{
    if(gameList.length === 151 && gameOngoing){
      setGameOngoing(false)
    } else {
      // setGameOngoing(true)
    }
  }, [gameList, gameOngoing]
  )

  const renderGameStatus = () => 
    gameOngoing 
      ? `${gameList.length} / 151`
      : gameList.length ? `You got ${gameList.length} out of 151. Play again?` : "Start typing below to start new game"

    const renderButton = () =>
      !gameOngoing && gameList.length 
        ? <button onClick={()=>resetGame()}>Reset Game</button>
        : <button onClick={()=>endGame()} disabled={!gameOngoing} className={!gameOngoing ? "disabled" : null}>End Game</button>


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

  
  return (
    <div className="app">
      <header>
        <h1>151 Pokémon Quiz</h1>
        <h2>Can you get all 151 Gen 1 Pokémon?</h2>
      </header>
      <div className="game-status">{renderGameStatus()}</div>
      <input 
        value={userInput}
        onChange={(e)=>handleOnChange(e.target.value)}
      />
      {renderButton()}
      <TestingButton setGameList={setGameList} setGameOngoing={setGameOngoing} />

      <table>
        {pokemonGroup.map((list)=>{ 
          return <tr>
            {list.map((pokemon)=>{
              return <TableData pokemon={pokemon} gameList={gameList} gameOngoing={gameOngoing}/>
            })}
          </tr>
        })}
      </table>
    </div>
  );
};