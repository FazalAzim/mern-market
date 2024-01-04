import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignedIn, setUser } from "../redux/user/userSlice";
import { Header, Oauth } from "../components";
import { RouterHelper } from "../helpers/router.helper";

const loginPage = () => {
	const [formData, setFormData] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const response = await fetch("/api/auth/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});
		const data = await response.json();
		console.log(data, "...response data");
		setLoading(false);
		dispatch(setSignedIn(true));
		dispatch(setUser(data));
		if (data.success === false) {
			setLoading(false);
			dispatch(setSignedIn(false));
		}
	};
	return (
		<>
			<Header />
			<div className="p-3 max-w-lg mx-auto">
				<h1 className="text-3xl text-center font-semibold my-7">
					<span className="text-slate-500 mr-1">Sign</span>
					<span className="text-slate-700">In</span>
				</h1>
				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
						{loading ? "Loading..." : "Sign In"}
					</button>
					<Oauth />
				</form>
				<div className="flex gap-2 mt-5">
					<p>Dont have an account?</p>
					<span
						onClick={() => navigate(RouterHelper.signup())}
						className="text-blue-700 cursor-pointer"
					>
						Sign up
					</span>
				</div>
			</div>
		</>
	);
};

export default loginPage;
