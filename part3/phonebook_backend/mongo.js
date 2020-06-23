const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-1nf5r.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
});

//If user provided name & number with password, adds the contact to db; else prints existing contact to console.
if (!process.argv[3]) {
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact);
    });
    mongoose.connection.close();
  })
} else {
  contact.save().then(result => {
    console.log(`Added ${contact.name} number ${contact.number} to phonebook!`);
    mongoose.connection.close();
  });
}
