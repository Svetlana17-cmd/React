import React, { useState } from 'react';
import FilterForm from './components/FilterForm';
import AddPersonForm from './components/AddPersonForm';
import PersonList from './components/PersonList';

const App = () => {
	const [names, setNames] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);

	const [newName, setNewName] = useState('');
	const [phone, setPhone] = useState('');
	const [searchName, setSearchName] = useState('');

	const handleSearchChange = (e) => {
		setSearchName(e.target.value);
	};

	const handleAddName = (event) => {
		event.preventDefault()
		if (names.some(item => item.name === newName)) {
			alert(`${newName} is already added to phonebook `);
		} else {
			setNames(prev => [...prev, { name: newName, number: phone }]);
			setNewName('');
			setPhone('');
		}
	};

	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<FilterForm searchName={searchName}
				handleSearchChange={handleSearchChange}
			/>
			<h3>Add a new</h3>
			<AddPersonForm setPhone={setPhone}
				setNewName={setNewName}
				handleAddName={handleAddName}
				newName={newName}
				phone={phone}
			/>
			<h3>Numbers</h3>
			<PersonList names={names} searchName={searchName} />
		</div>
	);
};

export default App;
