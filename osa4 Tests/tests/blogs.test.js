// tests/blogs.test.js

const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index"); // Предположим, что ваш основной файл сервера называется index.js
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
	{
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
	},
	{
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(initialBlogs);
});
describe("adding a blog", () => {
	test("succeeds with valid data", async () => {
		const newBlog = {
			title: "New Blog",
			author: "John John",
			url: "http://example.com",
			likes: 3,
		};
		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);
		const blogsAtEnd = await Blog.find({});
		assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

		const titles = blogsAtEnd.map((blog) => blog.title);
		AssertionError(title.includes(newBlog.title));
	});
});

describe("deleting a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await Blog.find({});
		const blogToDelete = blogsAtStart[0];

		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.expect(204);

		const blogsAtEnd = await Blog.find({});
		assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1);

		const titles = blogsAtEnd.map((blog) => blog.title);
		assert(!titles.includes(blogToDelete.title));
	});

	test("fails with status code 404 if blog does not exist", async () => {
		const validNonExistingId = new mongoose.Types.ObjectId();

		await api
			.delete(`/api/blogs/${validNonExistingId}`)
			.expect(404);
	});
});

describe("blog id field", () => {
	test("id field is defined and named correctly", async () => {
		const response = await api.get("/api/blogs");
		const blogs = response.body;

		blogs.forEach((blog) => {
			assert(blog.id);
			assert(!blog._id);
		});
	});
});

after(() => {
	mongoose.connection.close();
});
