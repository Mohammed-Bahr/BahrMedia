import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import postRoutes from "./MainPosts/PostRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT_NUMBER || 5000;

// Parse JSON and URL-encoded bodies so req.body is available
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/BahrMedia").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(`Connection to dataBase failed ${err}`);
});

app.use("/posts", postRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});






