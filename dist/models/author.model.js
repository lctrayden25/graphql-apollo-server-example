import mongoose from "mongoose";
const authorSchema = new mongoose.Schema({
    firtName: String,
    lastName: String,
}, { versionKey: false });
const Author = mongoose.model("Author", authorSchema);
module.exports = { Author };
