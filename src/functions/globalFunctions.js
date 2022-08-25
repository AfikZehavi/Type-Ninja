
let prevPos = null

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
    getPrevPos
}