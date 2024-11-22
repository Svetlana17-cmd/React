const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("give password as argument");
	process.exit(1);
}
const args = process.argv.slice(2);
const password = args[0];
const fullName = args[1];
const phoneNumber = args[2];

const url =
	`mongodb+srv://nikda1999:${password}@cluster.wlz1m.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	fullName: String,
	phoneNumber: String,
});

const Person = mongoose.model("Person", personSchema);
const addPerson = (fullName, phoneNumber) => {
	const person = new Person({
		fullName,
		phoneNumber,
	});
	person.save().then(() => {
		console.log("person saved!");
		console.log(`added ${fullName} number ${phoneNumber} to person`);
		mongoose.connection.close();
	});
};
const listPersons = () => {
	Person.find({})
		.then((result) => {
			console.log("person:");
			result.forEach((person) => {
				console.log(`${person.fullName} ${person.phoneNumber}`);
			});
			mongoose.connection.close();
		});
};
if (args.length === 3) addPerson(fullName, phoneNumber);
else if (args.length === 1) listPersons();
else {
	console.log(
		"Please provide the correct number of arguments: node mongo.js <password> [<name> <number>]",
	);
	mongoose.connection.close();
}

// Person.find({}).then((results) => {
// 	console.log("results", results);
// 	results.forEach((result) => {
// 		console.log("result " + result._id, result);
// 	});
// 	mongoose.connection.close();
// });
