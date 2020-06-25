const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-1nf5r.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

//If user provided name & number with password, adds the contact to db; else prints existing contact to console.
if (!process.argv[3]) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  })
} else {
  person.save().then(result => {
    console.log(`Added ${person.name} number ${person.number} to phonebook!`);
    mongoose.connection.close();
  });
}
