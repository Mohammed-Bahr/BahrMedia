import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT_NUMBER || 5000;

mongoose.connect("mongodb://localhost:27017/BahrMedia").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(`Connection to dataBase failed ${err}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






