import React from 'react'

const Search = ({ filter, onFilter }) => {
	return (
		<React.Fragment>
			<label>Filter shown with:</label>
			<input value={filter} onChange={onFilter} spellCheck={false} />
		</React.Fragment>
	)
}

export default Search
