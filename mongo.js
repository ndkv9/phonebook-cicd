const mongoose = require('mongoose')

if (process.argv.length < 5) {
	console.log(
		'Please provide the proper inputs as node mongo.js password name number',
	)
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://erik:${password}@cluster101.4lp4q.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name,
	number,
})

person.save().then(result => {
	console.log(`Added ${result.name}`)
	Person.find({}).then(result => {
		result.forEach(person =>
			console.log(`${person.name} ${person.number}`),
		)
		mongoose.connection.close()
	})
})
