const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

router.get("/", async (request, response) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs);
	} catch (error) {
		console.error("Error fetching blogs:", error);
		response.status(500).send("Internal Server Error");
	}
});

router.post("/", async (request, response) => {
	try {
		const blog = new Blog(request.body);
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	} catch (error) {
		console.error("Error saving blog:", error);
		response.status(500).send("Internal Server Error");
	}
});

router.delete("/:id", async (request, response) => {
	try {
		const blog = await Blog.findByIdAndRemove(request.params.id);
		if (blog) {
			response.status(204).end();
		} else {
			response.status(404).send("Blog not found");
		}
	} catch (error) {
		console.error("Error deleting blog:", error);
		response.status(500).send("Internal Server Error");
	}
});

module.exports = router;
