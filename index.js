require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms :body'))
app.use(cors())
app.use(express.static('frontend/build'))

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

//healthcheck-endpoint
app.get('/health', (req, res) => {
	res.send('ok')
})

// create new entry that is saved to the DB
app.post('/api/persons', (req, res, next) => {
	const body = req.body

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person
		.save()
		.then(result => res.json(result))
		.catch(err => next(err))
})

// fetching all phonebook entries from DB
app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then(persons => res.json(persons))
		.catch(err => next(err))
})

// getting info
app.get('/api/persons/info', (req, res, next) => {
	Person.find({})
		.then(persons =>
			res.send(`Phonebook has info of ${persons.length} persons`),
		)
		.catch(err => next(err))
})

// fetching a single phonebook entry
app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id

	Person.findById(id)
		.then(result => {
			if (result) {
				res.json(result)
			} else {
				throw Error('nonexist id')
			}
		})
		.catch(err => next(err))
})

// update phonebook entry's number
app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body
	const newPerson = {
		name: body.name,
		number: body.number,
	}
	Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
		.then(updatedPerson => res.json(updatedPerson))
		.catch(err => next(err))
})

// delete phonebook entry from DB base on its id
app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	Person.findByIdAndRemove(id)
		.then(result => res.status(204).end())
		.catch(err => next(err))
})

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error)

	if (error.name === 'CastError') {
		res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		res.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
	console.log(`server is running on port ${PORT}`),
)
