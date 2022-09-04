import { useEffect, useState } from "react";

const Timer = ({ setGameOn, isGameOn, timer, setTimer }) => {



    useEffect(() => {
        let intervalId
        if (isGameOn) {
            intervalId = setInterval(() => {
                setTimer(prevTime => prevTime - 1)
                if (timer <= 0) {
                    setTimer(0)
                    clearInterval(intervalId)
                    setGameOn(false)
                }
            }, 1000)
        }

        return () => clearInterval(intervalId)
    })


    return (
        <div className="timer-container">
            {timer}
        </div>
    );
}

export default Timer;