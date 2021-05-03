import React from 'react'

const Form = ({
	onSubmit,
	name,
	number,
	changeName,
	changeNumber,
}) => {
	return (
		<React.Fragment>
			<h2>Add New Contact</h2>
			<form onSubmit={onSubmit}>
				<div>
					<label>Name:</label>
					<input
						value={name}
						onChange={changeName}
						spellCheck={false}
						autoFocus={true}
					/>
				</div>

				<div>
					<label>Number:</label>
					<input value={number} onChange={changeNumber} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</React.Fragment>
	)
}

export default Form
