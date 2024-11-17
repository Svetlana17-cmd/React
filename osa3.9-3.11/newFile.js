const { app, notes } = require(".");

//добавление ресурса 
app.get('/api/notes/:id', (request, response) => {
	const id = request.params.id;
	const note = notes.find(note => note.id === id);
	if (note) {
		response.json(note);
	} else {
		response.status(404).end();
	}

});
