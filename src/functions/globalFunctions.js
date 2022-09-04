
let prevPos = null
let accuarcy
let wpm


const setAccuarcy = () => {
    const stringContainerEl = document.querySelector('.testString-container')
    const inputs = stringContainerEl.querySelectorAll('.correct').length + stringContainerEl.querySelectorAll('.incorrect').length
    const corrects = stringContainerEl.querySelectorAll('.correct').length

    accuarcy = corrects / inputs * 100
}

const getAccuarcy = () => {
    return accuarcy.toFixed(0)
}

const countWPM = (isHalfMinute = false) => {
    const stringContainerEl = document.querySelector('.testString-container')
    const wordsEl = stringContainerEl.querySelectorAll('.word')
    let score = 0
    let arrayFull = []

    for (let i = 0; i < wordsEl.length; i++) {
        const lettersEl = wordsEl[i].querySelectorAll('.letter')

        loop2:
        for (let j = 0; j < lettersEl.length; j++) {
            if (!lettersEl[j].classList.contains('correct')) {
                break loop2
            } else if (j === lettersEl.length - 1) {
                arrayFull.push(wordsEl[i])
                score++
            }
        }

    }

    isHalfMinute ? wpm = score * 2 : wpm = score
}

const getWPM = () => wpm

const getCurrLetter = (lettersArray) => {
    for (let i = lettersArray.length - 1; i > -1; i--) {
        if (lettersArray[i].className.includes('correct') || lettersArray[i].className.includes('incorrect')) {
            return lettersArray[++i]
        }
    }
    return lettersArray[0]
}

const getPrevPos = () => {
    if (prevPos) return prevPos
}

const calcCaretPosition = (letter, container) => {
    const letterPos = letter?.getBoundingClientRect()
    const containerPos = container.getBoundingClientRect()

    if (letterPos && containerPos) {
        const relativePos = {
            top: letter.offsetTop - Math.round(letter.clientHeight / 5),
            bottom: letterPos.bottom - containerPos.bottom,
            right: (letterPos.right - 1) - containerPos.right,
            left: letterPos.left - containerPos.left,
            leftEnd: letterPos.left - containerPos.left + letterPos.width
        }
        prevPos = relativePos
        return relativePos
    } else {
        let pos = {
            ...prevPos,
            left: prevPos.left + 15,
        }
        return pos
    };

}

export const globalFunctions = {
    getCurrLetter,
    calcCaretPosition,
    getPrevPos,
    setAccuarcy,
    getAccuarcy,
    countWPM,
    getWPM
}