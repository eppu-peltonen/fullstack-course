import React from 'react'

const Course = ({course}) => {

    return (
      <div>
        <Header header={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({header}) => {
    return (
      <div>
        <h1>{header}</h1>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return (
      parts.map(part =><div key={part.id}><Part part={part} /></div>)
    )
  }
  
  const Part = ({part}) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const reducer = (previousValue, currentValue) => previousValue + currentValue.exercises;
    const total = parts.reduce(reducer, 0);
    return (
      <div style={{fontWeight: "bold"}}>total of {total} exercises</div>
    )
  }

  export default Course