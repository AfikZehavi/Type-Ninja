import { useEffect, useRef, useState } from "react"
import { globalFunctions } from "../functions/globalFunctions"
import TestString from "./TestString"
import randomWords from 'random-words'

let stringContainerEl
let stringInputEl
let arrayString
let lettersArray


const StringDisplay = ({ isGameOn, isFirstPress, setGameOn, setFirstPress, handleReload, setIsGameOver, timer }) => {

    const [string, setString] = useState(randomWords(50))
    const [currWord, setCurrWord] = useState(0)
    const [caretPos, setCaretPos] = useState({
        top: '2px',
        left: '.5px'
    })

    const inputRef = useRef()
    let timeOutId
    const callForWPM = () => {
        timeOutId = setTimeout(() => {
            globalFunctions.countWPM()
        }, 60000)
    }

    const updatePos = (isNextWord = false) => {
        let newPos
        let prevPos = globalFunctions.getPrevPos()

        if (!isNextWord) {
            let currLetter = globalFunctions.getCurrLetter(lettersArray)
            if (currLetter) {
                newPos = globalFunctions.calcCaretPosition(currLetter, stringContainerEl)
            } else {
                newPos = globalFunctions.calcCaretPosition(lettersArray[lettersArray.length], stringContainerEl)
            }
        } else {
            newPos = globalFunctions.calcCaretPosition(lettersArray[0], stringContainerEl)
        }

        setCaretPos(newPos)
        if (prevPos && newPos.top > prevPos.top) {
            stringContainerEl.scrollTo({
                top: newPos.top,
                behavior: 'smooth',
            })
            setString(
                [...string,
                ...randomWords(10)]
            )
        }
    }

    const handleInput = (event) => {
        event.preventDefault()

        if (!isGameOn && !isFirstPress) {
            globalFunctions.setAccuarcy()
            clearTimeout(timeOutId)
            globalFunctions.countWPM(true)
            setIsGameOver(true)
            return
        }
        if (!isGameOn && isFirstPress) {
            setGameOn(true)
            setFirstPress(false)
            callForWPM()
        }



        arrayString = stringContainerEl.querySelectorAll('.word')
        lettersArray = arrayString[currWord].querySelectorAll('.letter')
        const arrayValue = stringInputEl.value.split('')

        lettersArray.forEach((characterSpan, idx) => {

            const character = arrayValue[idx]

            if (character == null) {
                characterSpan.classList.remove('correct')
                characterSpan.classList.remove('incorrect')
            } else if (character === characterSpan.innerText) {
                characterSpan.classList.add('correct')
                characterSpan.classList.remove('incorrect')


            } else {
                characterSpan.classList.remove('correct')
                characterSpan.classList.add('incorrect')


            }
        })


        updatePos()

    }

    const handleKeyUp = async (event) => {
        event.preventDefault()
        if (!isGameOn && !isFirstPress) return

        arrayString = stringContainerEl.querySelectorAll('.word')

        if (event.key === ' ' && currWord < arrayString.length - 1) {

            setCurrWord(currWord + 1)
            stringInputEl.value = ''
            lettersArray = arrayString[currWord + 1].querySelectorAll('.letter')
            updatePos(true)

        }
        inputRef.current.focus()
    }


    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp)
        document.addEventListener("click", () => {
            // inputRef.current.focus()
            const input = document.querySelector('.wordsInput')
            if (input) {
                input.focus()
            }
        })
        inputRef.current.focus();

        stringContainerEl = document.querySelector('.string-container')
        stringInputEl = document.querySelector('.wordsInput')
        return () => {
            document.removeEventListener("keyup", handleKeyUp)
            document.removeEventListener("click", () => {
                inputRef.current.focus()
            })
        }
    }, [currWord])

    return (
        <>
            <div className="string-container d-flex flex-column">
                {!isGameOn && <div className="caret caretHold" style={caretPos}></div>}
                {isGameOn && <div className="caret" style={caretPos}></div>}
                <input type="text" autoCapitalize="off" autoComplete="off" autoCorrect="off" list="autocompleteOff" name="wordsInput" className="wordsInput" autoFocus id="wordsInput" onInput={handleInput} ref={inputRef} />
                <TestString string={string} />
            </div>
            {!isFirstPress && <button className="clean-btn rld-btn" onClick={handleReload}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg></button>}

        </>
    )
}

export default StringDisplay