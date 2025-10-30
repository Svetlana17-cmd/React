const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {
	loginValidation,
	postCreateValidation,
	registerValidation,
} = require("./validations");
const { userController } = require("./controllers/User");
const { postController } = require("./controllers/Post");
const { CheckAuth } = require("./utils/checkAuth");
const { handleValidationErrors } = require("./utils/handleValidationErrors");

const password = process.argv[2];

mongoose
	.connect(
		`mongodb+srv://nikda1999:${password}@cluster.wlz1m.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster`,
	)
	.then(() => console.log("DB Ok"))
	.catch((err) => console.log("DB error", err));

const app = express();
app.use(cors());
app.use(express.json());

app.post(
	"/auth/login",
	loginValidation,
	handleValidationErrors,
	userController.login,
);

app.post(
	"/auth/register",
	registerValidation,
	handleValidationErrors,
	userController.register,
);

// app.get("/auth/me", CheckAuth, userController.getMe);

app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", CheckAuth, postCreateValidation, postController.create);
app.delete("/posts/:id", CheckAuth, postController.remove);

app.patch(
	"/posts/:id",
	CheckAuth,
	postCreateValidation,
	handleValidationErrors,
	postController.update,
);

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
