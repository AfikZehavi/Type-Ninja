const Options = ({onSetTime, showOptions}) => {

  const handleClick = (e) => {
    e.stopPropagation()
    const newTime = +e.target.innerHTML
    onSetTime(e, newTime)
    showOptions(false)
  }

  return (
    <div className="settings-module d-flex flex-column">
      <span><strong>Choose time: </strong></span>
      <div className="d-flex mt-2">
        <button className="clean-btn time-btn" onClick={(e)=> handleClick(e)}>30</button>
        <button className="clean-btn time-btn" onClick={(e)=> handleClick(e)}>60</button>
        <button className="clean-btn time-btn" onClick={(e)=> handleClick(e)}>90</button>
        <button className="clean-btn time-btn" onClick={(e)=> handleClick(e)}>120</button>
      </div>
    </div>
  )
}

export default Options;