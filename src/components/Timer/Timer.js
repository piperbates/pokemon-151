import React, {useEffect} from 'react';

import './Timer.css'

const Timer = ({endGame, gameOngoing, seconds, minutes, setMinutes, setSeconds}) => {

    useEffect(()=>{
        if(gameOngoing){        
            let myInterval = setTimeout(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(myInterval)
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } 
            }, 1000)
                return ()=> {
                    clearInterval(myInterval);
                };
        }
    }, [minutes, seconds, gameOngoing, setMinutes, setSeconds]);

    useEffect(()=>{
        if(minutes === 0 && seconds === 0){
            endGame()
        } 
    },[minutes, seconds, endGame])

    const renderTime = () => {
        const actualMinutes = minutes < 10 ? `0${minutes}` : minutes
        const actualSeconds = seconds < 10 ? `0${seconds}` : seconds
        return <span className="timer">{`${actualMinutes}:${actualSeconds}`}</span>
    }


    return renderTime()
}

export default Timer