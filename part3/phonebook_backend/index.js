require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

//Custom morgan token to show request body if request method is POST
morgan.token('content', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }});

  
  app.use(express.static('build'));
  app.use(express.json());
  app.use(cors());
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'));
  
  //Hard coded list of contacts in the phonebook
  let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ];
  
  //Route for displaying all contacts
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons)
    })
  });
  
  //Route for displaying total number of contacts and time the request was made.
  app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
      res.send(`<p>There are ${persons.length} contacts in the phonebook.</p><p>${new Date()}</p>`)
    })
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
    .catch(error => next(error))
  })

  //Route for updating contact
  app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
      name: body.name,
      number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
      .then(updatedContact => {
        res.json(updatedContact)
      })
      .catch(error => next(error))
  })
  
  //Route for deleting contact based on the id
  app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => console.log(error))
  });
  
  //Route for adding contacts to the phonebook
  app.post('/api/persons', (req, res) => {
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
    };
    
    const person = new Person({
      name: body.name,
      number: body.number,
      id: Math.floor(Math.random() * 10000000)
    })
    
    person
    .save()
    .then(newPerson => res.json(newPerson))
    .then(newPerson => newPerson.toJSON())
  });
  
  //Error handler middleware
  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }

  app.use(errorHandler);
  
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });