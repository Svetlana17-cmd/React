import React from 'react';

const FilterForm = ({ searchName, handleSearchChange }) => {
	return (
		<div>
			<input
				type="text"
				value={searchName}
				onChange={handleSearchChange}
				placeholder="filter"
			/>

		</div>
	);
};

export default FilterForm;
