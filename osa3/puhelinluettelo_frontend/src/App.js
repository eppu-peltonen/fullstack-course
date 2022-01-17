import React, { useState, useEffect } from 'react'
import { Persons, Filter, PersonForm } from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const sendMessage = (message) => {
    setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject)
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`Henkilö ${existingPerson.name} on jo lisätty yhteystietoihin, päivitetäänkö puhelinnumero?`)) {
        personService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
            sendMessage(`Henkilön ${personObject.name} numero muutettu`)
          })
          .catch(error => {
            sendMessage(`${personObject.name} on jo poistettu yhteystiedoista`)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          sendMessage(`${personObject.name} lisätty`)
        })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = person => {
    if (window.confirm(`Haluatko poistaa henkilön ${person.name} yhteystiedoista?`)) {
      personService
      .deletePerson(person)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        sendMessage(`${person.name} poistettu`)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterPersons(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterPersons={filterPersons} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterPersons={filterPersons} deletePerson={deletePerson} />  
    </div>
  )
}

export default App