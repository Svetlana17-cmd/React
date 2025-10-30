const mongoose = require("mongoose");

const password = process.argv[2];

mongoose
	.connect(
		`mongodb+srv://nikda1999:${password}@cluster.wlz1m.mongodb.net/person?retryWrites=true&w=majority&appName=Cluster`,
	)
	.then(() => console.log("DB Ok"))
	.catch((err) => console.log("DB error", err));

mongoose.set("strictQuery", false);

const phoneRegex = /^\d{2,3}-\d{5,}$/;

const personSchema = new mongoose.Schema({
	fullName: {
		type: String,
		minlength: 3,
		required: true,
	},
	phoneNumber: {
		type: String,
		validate: {
			validator: function (v) {
				return phoneReges.test(v);
			},
			message: (props) => `${props.value} is not a valid phone number`,
		},
		required: true,
	},
}, { timestamps: true });

module.exports = mongoose.model("Person", personSchema);
