import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("database connection established");
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(port, () => {
	console.log(`listening on port : ${port}`);
});
