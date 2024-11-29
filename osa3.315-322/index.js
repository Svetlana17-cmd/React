const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const Person = require("./models/person");

const app = express();
require("dotenv").config();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

const unknownEndpoint = (request, response) => {
	const path = request.path;
	response.status(404).send({ error: "unknown endpoint", path });
};
const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformed id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
	),
);

app.get("/api/persons", (request, response) => {
	Person.find({}).then((person) => {
		console.log("person: ", person);
		response.json(person);
	})
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error: "internal server error" });
		});
});

app.get("/info", (request, response) => {
	const nameOfEntries = Person.length;
	const requestTime = new Date().toString();
	response.send(`
		 <html>
			  <body>
					<p>Phonebook has info for ${nameOfEntries} people</p>
					<p>${requestTime}</p>
			  </body>
		 </html>
	`);
});

app.post("/api/persons", (request, response) => {
	const { fullName, phoneNumber } = request.body;
	try {
		const existingPerson = Person.findOne({ fullName });
		if (existingPerson) {
			return response.status(400).json({
				error: "fullName must be unique",
			});
		}
		const person = new Person({
			fullName,
			phoneNumber,
		});
		person.save().then((savedPerson) => {
			console.log("person saved!");
			console.log("savedPerson", savedPerson);
			response.status(201).json(savedPerson);
		});
	} catch (error) {
		console.log(error);
		if (error.name == "ValidationError") {
			return response.status(400).json({ error: error.message });
		}
		response.status(500).json({
			message: "Internal server error",
		});
	}
});

app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).json({
					error: "no person found",
					request: {
						id: request.params.id,
					},
				});
			}
		})
		.catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
	const body = request.body;

	const person = {
		fullName: body.fullName,
		phoneNumber: body.phoneNumber,
	};

	Person.findByIdAndUpdate(
		request.params.id,
		person,
		{ new: true, runValidators: true, context: "query" },
	)
		.then((updatedPerson) => {
			response.json(updatedPerson);
		})
		.catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
