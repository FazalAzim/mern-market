import User from "../models/user.model.js";

export const signup = async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).json("user created successfully");
	} catch (error) {
		res.status(400).json(error.message);
	}
};
