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
    <tbody>
      <tr>
        <td>{props.text} {props.value}</td>
      </tr>
    </tbody>
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
      <h2>Statistics</h2>
      {
        all !== 0 ?
          <table>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={good + neutral + bad} />
            <Statistic text='average' value={goodMinusBad / all} />
            <Statistic text='positive' value={positive * 100 + '%'} />
          </table>
        : 
        <div>
          <p>No feedback given</p>
        </div>
      } 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)