import mongoose from "mongoose";
import "dotenv/config";
const dbUsername = encodeURIComponent(process.env.DB_USERNAME);
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
export const connect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@apollo-graphql-server.smzn65v.mongodb.net/`);
        console.log("db connected.");
    }
    catch (error) {
        console.log(error);
    }
};
