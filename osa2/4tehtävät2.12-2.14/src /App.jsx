import React, { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';
import personService from './services/persons';


const App = () => {

	const [newName, setNewName] = useState('');
	const [phone, setPhone] = useState('');
	const [searchName, setSearchName] = useState('');
	const [persons, setPersons] = useState([]);
	const [filteredPersons, setFilteredPersons] = useState([]);


	useEffect(() => {
		console.log('effect')
		personService
			.getAll()
			.then(response => {
				setPersons(response.data);
				setFilteredPersons(response.data);
			})
			.catch(error => {
				console.error('Error fetching persons:', error);
			});
	}, [])

	const addPerson = (event) => {
		event.preventDefault();
		const personObject = {
			name: newName,
			number: phone,
			important: Math.random() > 0.5
		};
		const nameExists = persons.some(person => person.name === newName);
		if (nameExists) {
			alert(`${newName} is already added to phonebook`);
		} else {
			personService
				.create(personObject)
				.then(response => {
					const updatedPersons = persons.concat(response.data);
					setPersons(updatedPersons);
					setFilteredPersons(updatedPersons);
					setNewName('');
					setPhone('');
				})
				.catch(error => {
					console.error('Error adding person:', error);
				});
		}
	};
	const handleSearchChange = (event) => {
		const searchValue = event.target.value.toLowerCase();
		setSearchName(searchValue);
		const filtered = persons.filter(person =>
			person.name && person.name.toLowerCase().includes(searchValue)
		);
		setFilteredPersons(filtered);
	};


	const deletePerson = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			personService
				.delete(id)
				.then(() => {
					const updatedPersons = persons.filter(person => person.id !== id);
					setPersons(updatedPersons);
					setFilteredPersons(updatedPersons);
				})
				.catch(error => {
					console.error('There was an error deleting the person!', error);
				});
		}
	};



	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	const handleNumberChange = (event) => {
		setPhone(event.target.value)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<FilterForm searchName={searchName} handleSearchChange={handleSearchChange} />
			<h3>Add a new</h3>
			<AddPersonForm
				addPerson={addPerson}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				newName={newName}
				phone={phone}
			/>
			<h3>Numbers</h3>
			<ul>
				{filteredPersons && filteredPersons.map(person => (
					<PersonList
						key={person.id}
						person={person}
						deletePerson={deletePerson}
					/>
				))}
			</ul>
		</div>
	);

};

export default App;