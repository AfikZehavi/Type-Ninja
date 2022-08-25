import { useEffect, useRef, useState } from "react"
import { globalFunctions } from "../functions/globalFunctions"
import TestString from "./TestString"
import randomWords from 'random-words'

let stringContainerEl
let stringInputEl
let arrayString
let lettersArray


const StringDisplay = () => {


    const [currWord, setCurrWord] = useState(0)
    const [isGameOn, setGameOn] = useState(false)
    const [string, setString] = useState(randomWords(50))
    const [caretPos, setCaretPos] = useState({
        top: '2px',
        left: '.5px'
    })

    const inputRef = useRef()


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

        }
    }


    const handleInput = (event) => {
        event.preventDefault()

        if (!isGameOn) {
            setGameOn(true)
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
            inputRef.current.focus()
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
        <div className="string-container">
            {!isGameOn && <div className="caret caretHold" style={caretPos}></div>}
            {isGameOn && <div className="caret" style={caretPos}></div>}
            <input type="text" name="wordsInput" className="wordsInput" autoFocus id="wordsInput" onInput={handleInput} ref={inputRef} />
            <TestString string={string} />
        </div>
    )
}

export default StringDisplay