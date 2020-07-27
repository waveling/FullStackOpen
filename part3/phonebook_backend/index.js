require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

//Custom morgan token to show request body if request method is POST
morgan.token('content', function (req) {
	if (req.method === 'POST') {
		return JSON.stringify(req.body);
	}});


app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));

//Hard coded list of contacts in the phonebook
let persons = [
];

//Route for displaying all contacts
app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons);
	});
});

//Route for displaying total number of contacts and time the request was made.
app.get('/info', (req, res) => {
	Person.find({}).then(persons => {
		res.send(`<p>There are ${persons.length} contacts in the phonebook.</p><p>${new Date()}</p>`);
	});
	/* res.send(`<p>There are ${res.length} contacts in the phonebook.</p><p>${new Date()}</p>`); */
});

//Route for displaying specific contact based on the id
app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));
});

//Route for updating contact
app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
		.then(updatedContact => {
			res.json(updatedContact.toJSON());
		})
		.catch(error => next(error));
});

//Route for deleting contact based on the id
app.delete('/api/persons/:id', (req, res, next) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch(error => next(error));
});

//Route for adding contacts to the phonebook
app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	if (!body.name) {
		return res.status(400).json({
			error: 'Name is missing!'
		});
	} else if (!body.number) {
		return res.status(400).json({
			error: 'Number is missing!'
		});
	} else if (persons.some(person => person.name === body.name)) {
		return res.status(400).json({
			error: 'Name must be unique!'
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
		id: Math.floor(Math.random() * 10000000)
	});

	person
		.save()
		.then(newPerson => newPerson.toJSON())
		.then(formattedPerson => res.json(formattedPerson))
		.catch(error => next(error));
});

//Error handler middleware
const errorHandler = (error, req, res, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});