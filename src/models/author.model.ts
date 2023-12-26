import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
	{
		firtName: String,
		lastName: String,
	},
	{ versionKey: false }
);

const Author = mongoose.model("Author", authorSchema);
export default Author;
// module.exports = { Author };
