const express = require('express');
const app = express();
const morgan = require('morgan');

morgan.token('content', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }});


app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

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
  res.send(persons);
});

//Route for displaying total number of contacts and time the request was made.
app.get('/info', (req, res) => {
  const count = persons.length;
  res.send(`<p>There are ${count} contacts in the phonebook.</p><p>${new Date()}</p>`);
});

//Route for displaying specific contact based on the id in the URL
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

//Route for deleting contact based on the id in the URL
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);
  
  res.status(204).end();
});

/* Generate ID for each added contact
const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(person => person.id))
  : 0;
  return maxId + 1;
} */

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

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000000)
  }

  persons = persons.concat(person);

  res.json(person);
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});