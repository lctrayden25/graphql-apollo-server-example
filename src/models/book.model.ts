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

const Book = mongoose.model("Book", bookSchema);
export default Book;
// module.exports = { Book };
