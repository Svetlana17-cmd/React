require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Person = require("./models/person");

const app = express();

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

const unknownEndpoint = (request, response) => {
	const path = request.path;
	response.status(404).send({ error: "unknown endpoint", path });
};
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
	),
);
app.get("/api/persons", (request, response) => {
	Person.find({}).then((persons) => {
		console.log("person: ", result);
		response.json(persons);
	})
		.catch((error) => {
			console.log(error);
			response.status(500).json({ error: "internal server error" });
		});
});

app.get("/info", (request, response) => {
	const numberOfEntries = person.length;
	const requestTime = new Date().toString();
	response.send(`
		 <html>
			  <body>
					<p>Phonebook has info for ${numberOfEntries} people</p>
					<p>${requestTime}</p>
			  </body>
		 </html>
	`);
});

app.get("/api/persons/:id", (request, response) => {
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
		.catch((error) => {
			console.log("Error finding person:", error);
			response.status(500).json({
				error: "internal server error",
			});
		});
});

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndDelete(request.params.id)
		.then((person) => {
			response.status(204).end();
		})
		.catch((error) => {
			console.error("Error finding person:", error);
			response.status(500).json({
				error: "internal server error",
			});
		});
});

app.post(
	"/api/persons",
	async (request, response) => {
		const body = request.body;
		try {
			const existingPerson = await Person.findOne({ fullName });
			if (existingPerson) {
				return response.status(400).json({
					error: "fullName must be unique",
				});
			}
			const person = new Person({
				fullName: body.fullName,
				phoneNumber: body.phoneNumber,
			});
			person.save().then((savedPerson) => {
				console.log("person saved!");
				console.log("savedPerson", savedPerson);
				response.status(201).json(savedPerson);
			});
		} catch (error) {
			console.error("Error saving person:", error);
			response.status(500).json({ error: "internal server error" });
		}
	},
);

app.put("/api/persons/:id", (request, response) => {
	const body = request.body;
	const person = {
		fullName: body.fullName,
		phoneNumber: body.phoneNumber,
	};

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then((updatedPerson) => {
			console.log("result", result);
			response.json(updatedPerson);
		})
		.catch((error) => {
			console.error("Error finding people:", error);
			response.status(500).json({
				error: "internal server error",
			});
		});
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
