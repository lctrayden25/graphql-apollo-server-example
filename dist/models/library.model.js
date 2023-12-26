import mongoose from "mongoose";
const librarySchema = new mongoose.Schema({
    name: String,
    address: String
}, { versionKey: false });
const Library = mongoose.model("Library", librarySchema);
module.exports = { Library };
