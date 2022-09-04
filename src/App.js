import './assets/main.scss'
import StringDisplay from './components/StringDisplay'
import Header from './components/Header'
import Footer from './components/Footer'
import Timer from './components/Timer'
import Score from './components/Score'
import { useEffect, useState } from 'react'
import randomWords from 'random-words'

function App() {

  const [timer, setTimer] = useState(30)
  const [userTime, setUserTime] = useState(30)
  const [isGameOn, setGameOn] = useState(false)
  const [isFirstPress, setFirstPress] = useState(true)
  const [refKey, setRefKey] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)


  const onSetTime = (e, time) => {
    handleReload(e)
    setUserTime(time)
    setTimer(time)
  }

  const handleReload = (e) => {
    e.stopPropagation()
    setGameOn(false)
    setIsGameOver(false)
    setTimer(userTime)
    setFirstPress(true)
    setRefKey(key => key + 1)
  }

  return (
    <div className="App d-flex flex-column">
      <Header onSetTime={onSetTime} handleReload={handleReload} />

      <div className="test-container">
        {isGameOver &&
          <div className='d-flex justify-content-center'>
            <Score handleReload={handleReload}/>
          </div>}
        {!isGameOver &&
          <div>
            <Timer key={refKey} isGameOn={isGameOn} setGameOn={setGameOn} timer={timer} setTimer={setTimer} />
            <StringDisplay key={refKey + 1} isFirstPress={isFirstPress}
              setFirstPress={setFirstPress} timer={timer} isGameOn={isGameOn} setGameOn={setGameOn} handleReload={handleReload} setIsGameOver={setIsGameOver} />
          </div>}
      </div>
      <Footer />
    </div>
  );
}

export default App
