import mongoose from "mongoose";
const libraryModel = new mongoose.Schema({
    name: String,
    address: String
}, { versionKey: false });
const Library = mongoose.model("Library", libraryModel);
module.exports = Library;
