const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
	morgan(
		":method :url :status :res[content-length] - :response-time ms :body",
	),
);

const port = 3001;

app.get("/api/persons", (request, response) => {
	Person.find({}).then((person) => response.json(person));
});

app.get("/info", (request, response) => {
	const numberOfEntries = persons.length;
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
	console.log("request.params", request.params);

	Person.findById(request.params.id)
		.then((person) => {
			if (person) {
				response.json(person);
			} else {
				response.status(404).json({
					error: "no person found",
					request: {
						id: _id,
					},
				});
			}
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
	(request, response) => {
		const { name, number } = request.body;

		if (!name || !number) {
			return response.status(400).json({ error: "name or number missing" });
		}

		const nameExists = persons.some((person) => person.name === name);
		if (nameExists) {
			return response.status(400).json({ error: "name must be unique" });
		}

		const newPerson = { ...request.body, id: generateId() };
		persons.push(newPerson);

		response.status(201).json(newPerson);
	},
);

app.put("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const body = request.body;

	persons = persons.map((person) => {
		if (Number(person.id) === id) {
			return { ...body, id };
		}
		return person;
	});
	response.json(body);
});

app.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	persons = persons.filter((person) => Number(person.id) !== id);

	response.status(204).end();
});

const unknownEndpoint = (request, response) => {
	const path = request.path;
	response.status(404).send({ error: "unknown endpoint", path });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
