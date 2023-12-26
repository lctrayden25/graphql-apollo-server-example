import mongoose, { Model, Mongoose } from "mongoose";

const bookSchema = new mongoose.Schema(
	{
		title: String,
		branch: String,
	},
	{
		versionKey: false,
	}
);

export const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
