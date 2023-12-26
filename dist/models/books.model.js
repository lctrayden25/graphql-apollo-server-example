import mongoose from "mongoose";
const BookModel = new mongoose.Schema({
    title: String,
    branch: String,
}, {
    versionKey: false,
});
const Book = mongoose.model("Book", BookModel);
module.exports = Book;
