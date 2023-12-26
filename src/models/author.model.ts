import mongoose from "mongoose";

const authorModel = new mongoose.Schema(
	{
		firtName: String,
		lastName: String,
	},
	{ versionKey: false }
);

const Author = mongoose.model("Author", authorModel);
module.exports = Author;
