import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import { connect } from "./db/connection.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

connect();
app.listen(port, () => {
	console.log(`listening on port : ${port}`);
});

app.use("/api/user", userRouter);
