const { body } = require("express-validator");

const loginValidation = [
	body("email", "Invalid email format").isEmail(),
	body("password", "Password must be at least 5 characters long").isLength({
		min: 5,
	}),
];

const registerValidation = [
	body("email", "Invalid email format").isEmail(),
	body("password", "Password must be at least 5 characters long").isLength({
		min: 5,
	}),
	body("fullName", "Full name").isLength({ min: 3 }),
];

const postCreateValidation = [
	body("title", "Enter the title of the article").isLength({ min: 3 })
		.isString(),
	body("text", "Enter the text of the article").isLength({ min: 3 })
		.isString(),
];

module.exports = {
	loginValidation,
	registerValidation,
	postCreateValidation,
};
