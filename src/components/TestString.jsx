import { useEffect, useState } from "react"

const TestString = (props) => {
    const [testString, setTestString] = useState([])


    useEffect(() => {
        const wordsArray = props.string.map(word => {
            const wordSpan = document.createElement('div')
            return wordSpan.innerHTML = word
        })
        setTestString(wordsArray)


    }, [props.string])


    return (
        <div className="testString-container">
            {testString.map((word, idx) => {
                return <div className="word" key={idx}>{word.split('').map((character, index) => {
                    return <span key={index} className="letter">{character}</span>
                })}</div>
            })}
        </div>
    );
}

export default TestString;