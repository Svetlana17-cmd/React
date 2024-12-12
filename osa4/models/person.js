const mongoose = require("mongoose");

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
	passwordHash: {
		type: String,
		required: true,
	},
}, { timestamps: true });

// personSchema.set("toJSON", {
// 	transform: (document, returnedObject) => {
// 		returnedObject.id = returnedObject._id.toString();
// 		delete returnedObject._id;
// 		delete returnedObject.__v;
// 	},
// });

module.exports = mongoose.model("Person", personSchema);
