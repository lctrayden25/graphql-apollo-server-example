import mongoose from "mongoose";
export const connect = async () => {
    await mongoose.connect("mongodb+srv://lctrayden0925:<password>@apollo-graphql-server.smzn65v.mongodb.net/");
};
