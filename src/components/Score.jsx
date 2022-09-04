import { useEffect, useState } from "react";
import { globalFunctions } from "../functions/globalFunctions";

const Score = ({ handleReload }) => {
    const Accuarcy = globalFunctions.getAccuarcy()
    const wpm = globalFunctions.getWPM()
    const [isBtnShown, setIsBtnShown] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.accuarcy-container').classList.add('shown')

        }, 500)

        setTimeout(() => {
            document.querySelector('.wpm-container').classList.add('shown')

        }, 700);

        setTimeout(() => {
            setIsBtnShown(true)
        }, 1100);
    },[])

    return (
        <div className="score-main d-flex flex-column align-items-center">
            <div className="score-container d-flex">
                <div className="accuarcy-container d-flex flex-column align-items-center">
                    <h2>Accuarcy:</h2>
                    <span>(Letters entered correctly)</span>
                    <h3>{Accuarcy}%</h3>
                </div>

                <div className="wpm-container d-flex flex-column align-items-center">
                    <h2>WPM: </h2>
                    <span>(Words per minute)</span>
                    <h3>{wpm}</h3>
                </div>
            </div>
            <div className="play-again-container">
                {isBtnShown && <button className="play-again-btn" onClick={(e) => handleReload(e)}><span>Play Again</span></button>}
            </div>
        </div>
    );
}

export default Score;