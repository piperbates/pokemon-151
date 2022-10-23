import React, { useEffect, useState } from 'react'

export default function TableData({ pokemon, gameList, gameOngoing }) {
    const [displayName, setDisplayName] = useState("");
    const [answered, setAnswered] = useState(false);

    useEffect(()=> {
        if(gameOngoing){
            if(gameList!==0){
                if(gameList.includes(pokemon.name.toLowerCase())){
                    setDisplayName(pokemon.name);
                    setAnswered(true);
                    return
                }
                setDisplayName("")
            }
        }
        if(!gameOngoing && gameList.length === 0){
            setAnswered(false)
        }
    }, [gameList, pokemon, gameOngoing])

    useEffect(()=>{
        if(!gameOngoing && !answered && gameList.length){
            setDisplayName(pokemon.name)
        } else if(gameList.length === 0){setDisplayName("")}
    }, [gameOngoing, answered, gameList, pokemon])

    const shouldUnansweredBeRed = !gameOngoing && !answered && gameList.length ? true : false

    const styleAnswered =  {color: "black"}
    const styleIncorrect = shouldUnansweredBeRed ? {color: "red"} : styleAnswered
    const backgroundAnswered = answered ? {
        backgroundColor: "#90EE90", 
        border: "1px solid #90EE90"
    } : {backgroundColor: "white", border: "1px solid grey"}

    return (
        <td style={backgroundAnswered}>
            <span 
                style={!gameOngoing 
                            ? answered ? styleAnswered : styleIncorrect
                            : {color:"black"}}
            >{pokemon.dex}: {displayName}</span>
        </td>
    )
}