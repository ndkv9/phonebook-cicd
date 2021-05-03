import React from 'react'

const People = ({ people, regexp, remove }) => {
	const filteredpeople = people.filter(person =>
		regexp.test(person.name),
	)

	return (
		<React.Fragment>
			{filteredpeople.length === 0
				? 'There is no match'
				: filteredpeople.map(person => (
						<Person key={person.id} info={person} remove={remove} />
				  ))}
		</React.Fragment>
	)
}

const Person = ({ info, remove }) => {
	return (
		<p>
			{info.name} {info.number}
			<button
				onClick={() => {
					const confirmation = window.confirm(
						`Are you sure you want to remove ${info.name}`,
					)
					confirmation && remove(info.id)
				}}
			>
				delete
			</button>
		</p>
	)
}

export default People
