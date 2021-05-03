import React from 'react'

const SuccessNotification = ({ message }) => {
	if (message.contact === null) {
		return null
	}
	return (
		<div className='success'>
			{message.action} {message.contact}
		</div>
	)
}

const ErrorNotification = ({ message }) => {
	if (message === null) {
		return null
	}
	return <div className='error'>{message}</div>
}

export { SuccessNotification, ErrorNotification }
