const mongoose = require("mongoose");

const password = process.argv[2];

mongoose
	.connect(
		`mongodb+srv://nikda1999:${password}@cluster.wlz1m.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster`,
	)
	.then(() => console.log("DB Ok"))
	.catch((err) => console.log("DB error", err));

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
	fullName: String,
	phoneNumber: String,
}, { timestamps: true });

module.exports = mongoose.model("Person", personSchema);
