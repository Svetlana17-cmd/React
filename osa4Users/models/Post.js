const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
			unique: true,
		},
		viewsCount: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
