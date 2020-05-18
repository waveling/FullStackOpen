import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.name}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>{props.all}</p>
      <p>average {props.goodMinusBad / props.all}</p>
      <p>positive {props.positive * 100}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleGood = () =>  setGood(good + 1)
  const handleNeutral = () =>  setNeutral(neutral + 1)
  const handleBad = () =>  setBad(bad + 1)
  
  const goodMinusBad = good - bad
  const all = good + bad + neutral
  const positive = good / all

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        handleClick={handleGood}
        name='Good'
      />
      <Button 
        handleClick={handleNeutral}
        name='Neutral'
      />
      <Button 
        handleClick={handleBad}
        name='Bad'
      />
      {
        all !== 0 ?    
      <Statistic 
        goodMinusBad={goodMinusBad} 
        all={all} 
        positive={positive}
        good={good} 
        neutral={neutral} 
        bad={bad} 
      /> : 
      <div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
      }
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)