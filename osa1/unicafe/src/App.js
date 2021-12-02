import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Header = ({title}) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const sum = good + neutral + bad
  const avg = (good - bad) / sum
  const pos = (good / sum)*100 + " %"

  if (sum === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={sum} />
          <StatisticLine text='average' value={avg} />
          <StatisticLine text='positive' value={pos} />
        </tbody>
      </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandler = () => {
    setGood(good + 1)
  }

  const neutralClickHandler = () => {
    setNeutral(neutral + 1)
  }
  
  const badClickHandler = () => {
    setBad(bad + 1)
  }

  

  return (
    <div>
      <Header title='Give feedback' />
      <Button handleClick={goodClickHandler} text='good' />
      <Button handleClick={neutralClickHandler} text='neutral' />
      <Button handleClick={badClickHandler} text='bad' />
      <Header title="Statistics" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App