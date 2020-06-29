const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	number: {
		type: String,
		required: true,
		unique: true,
		minlength: 8
	},
});

personSchema.plugin(uniqueValidator);


//Modify the returned object by removing the _id and __v keys and assigning the _id key to id (also transforming it to a string).
personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);