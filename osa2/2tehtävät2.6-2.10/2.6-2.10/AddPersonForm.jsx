import React from 'react';

const AddPersonForm = ({ newName, phone, handleAddName, setNewName, setPhone }) => {
	return (
		<div>
			<input
				type="text"
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
				placeholder="name"
			/>
			<input
				type="text"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				placeholder="number"
			/>
			<button onClick={handleAddName}>add</button>
		</div>
	);
};

export default AddPersonForm;
