const express = require("express");
const cors = require("cors");
const blogRouter = require("./routes/blogs1");
const mongoose = require("mongoose");

const app = express();

const password = process.argv[2];

mongoose
	.connect(
		`mongodb+srv://nikda1999:${password}@cluster.wlz1m.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster`,
	)
	.then(() => console.log("DB Ok"))
	.catch((err) => console.log("DB error", err));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
