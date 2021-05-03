import React, { useState, useEffect } from 'react'
import contactService from '../services/contacts'
import Search from './Search'
import Form from './Form'
import People from './People'
import {
	SuccessNotification,
	ErrorNotification,
} from './Notification'

function App() {
	const [people, setPeople] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	const [successfulMessage, setSuccessfulMessage] = useState({
		contact: null,
		action: '',
	})
	const [errorMessage, setErrorMessage] = useState(null)

	// Fetch data from json-server
	useEffect(() => {
		contactService
			.getAll()
			.then(returnedPeople => {
				setPeople(returnedPeople)
			})
			.catch(err => {
				// eslint-disable-next-line no-console
				console.log(err)
				setNewName('')
				setNewNumber('')
			})
	}, [])

	const onSubmit = event => {
		event.preventDefault()

		// Convert the name array into lowercase so we will check if
		// the name has already added in both cases Lower and Upper
		let nameArray = people.map(person => person.name.toLowerCase())

		// Check whether a name already exist in the phonebook
		if (nameArray.includes(newName.toLowerCase())) {
			const confirmation = window.confirm(
				`${newName} is already added to the phonebook, replace the old number with a new one?`,
			)
			if (confirmation) {
				const selectedPerson = people.find(
					person => person.name === newName,
				)
				const newContact = {
					name: selectedPerson.name,
					number: newNumber,
				}
				contactService
					.update(selectedPerson.id, newContact)
					.then(returnedContact => {
						setSuccessfulMessage({
							contact: returnedContact.name,
							action: 'Updated',
						})
						setTimeout(
							() =>
								setSuccessfulMessage({ contact: null, action: '' }),
							3000,
						)
						setPeople(
							people.map(person =>
								person.id !== selectedPerson.id
									? person
									: returnedContact,
							),
						)
					})
					.catch(err => {
						// eslint-disable-next-line no-console
						console.log(err.message)
						setErrorMessage(selectedPerson.name)
						setTimeout(() => setErrorMessage(null), 3000)
						setPeople(
							people.filter(
								person => person.id !== selectedPerson.id,
							),
						)
						setNewName('')
						setNewNumber('')
					})
			}
			setNewName('')
			setNewNumber('')
			return
		} else {
			const newPerson = {
				name: newName,
				number: newNumber,
				id: people.length,
			}

			contactService
				.create(newPerson)
				.then(returnedPerson => {
					setSuccessfulMessage({
						contact: returnedPerson.name,
						action: 'Added',
					})
					setTimeout(
						() => setSuccessfulMessage({ contact: null, action: '' }),
						3000,
					)
					setPeople(people.concat(returnedPerson))
					setNewName('')
					setNewNumber('')
				})
				.catch(err => {
					// eslint-disable-next-line no-console
					console.log(err.message)
					setErrorMessage(`${err.name} ${err.message}`)
					setTimeout(() => setErrorMessage(null), 3000)
					setNewName('')
					setNewNumber('')
				})
		}
	}

	// Remove contact bases on person.id
	const removeContact = id => {
		contactService
			.remove(id)
			.then(returnedContact => {
				setSuccessfulMessage({
					contact: returnedContact.name,
					action: 'Deleted',
				})
				setTimeout(
					() => setSuccessfulMessage({ contact: null, action: '' }),
					3000,
				)
				setPeople(people.filter(person => person.id !== id))
			})
			// eslint-disable-next-line no-console
			.catch(err => console.log(err.message))
	}

	const handleNameChange = event => {
		setNewName(event.target.value)
	}

	const handleNumberChange = event => {
		setNewNumber(event.target.value)
	}

	const handleFilterChange = event => {
		setNewFilter(event.target.value)
	}

	// Set Regular expression for filter
	let regexp = RegExp(`${newFilter.toString()}`, 'i')

	return (
		<React.Fragment>
			<h1>Phonebook</h1>

			<SuccessNotification message={successfulMessage} />

			<ErrorNotification message={errorMessage} />

			<Search filter={newFilter} onFilter={handleFilterChange} />

			<Form
				onSubmit={onSubmit}
				name={newName}
				changeName={handleNameChange}
				number={newNumber}
				changeNumber={handleNumberChange}
			/>

			<h2>Numbers</h2>
			<People
				people={people}
				regexp={regexp}
				remove={removeContact}
			/>
		</React.Fragment>
	)
}

export default App
