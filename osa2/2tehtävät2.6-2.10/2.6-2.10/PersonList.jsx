import React from 'react';

const PersonList = ({ names, searchName }) => {
	const filteredNames = names.filter(item =>
		item.name.toLowerCase().includes(searchName.toLowerCase())
	);

	return (
		<ul>
			{filteredNames.map((item, index) => (
				<li key={index}>{item.name} - ({item.number})</li>
			))}
		</ul>
	);
};

export default PersonList;
