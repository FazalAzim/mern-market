import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connect = async () => {
	await mongoose
		.connect(process.env.MONGO_URL)
		.then(() => {
			console.log("database connection established");
		})
		.catch((error) => {
			console.log(error);
		});
};
