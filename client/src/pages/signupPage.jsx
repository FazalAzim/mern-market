import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { RouterHelper } from "../helpers/router.helper";

const signupPage = () => {
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const response = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		if (data.success === false) {
			setLoading(false);
		}
		setLoading(false);
		console.log(data, "...Data");
	};
	return (
		<>
			<Header />
			<div className="p-3 max-w-lg mx-auto">
				<h1 className="text-3xl text-center font-semibold my-7">
					<span className="text-slate-500 mr-1">Sign</span>
					<span className="text-slate-700">Up</span>
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="username"
						id="username"
						onChange={handleChange}
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="email"
						id="email"
						onChange={handleChange}
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="password"
						id="password"
						onChange={handleChange}
						className="border focus:outline-none  p-4 rounded-lg"
					/>
					<button
						disabled={loading}
						className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
					>
						{loading ? "Loading..." : "Sign Up"}
					</button>
				</form>
				<div className="flex gap-2 mt-5">
					<p>Have an account?</p>
					<span
						onClick={() => navigate(RouterHelper.login())}
						className="text-blue-700 cursor-pointer"
					>
						Sign in
					</span>
				</div>
			</div>
		</>
	);
};

export default signupPage;
