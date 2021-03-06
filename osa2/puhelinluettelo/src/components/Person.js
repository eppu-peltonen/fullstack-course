import React from 'react'

const Persons = ({persons, filterPersons, deletePerson}) => {
  const personsToShow = filterPersons
  ? persons.filter(person => person.name.toLowerCase().indexOf(filterPersons.toLowerCase()) > -1)
  : persons

  return (
    <div>
      {personsToShow.map(person =>
        <div key={person.id}>
          {person.name}
          {person.number}
          <button onClick={() => deletePerson(person)}>poista</button>
        </div>)}
    </div>
  )
}

const Filter = ({filterPersons, handleFilterChange}) => {
  return (
    <div>
      filter shown with <input value={filterPersons} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export {
  Persons,
  Filter,
  PersonForm
}