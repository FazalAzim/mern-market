import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components";
import { RouterHelper } from "../helpers/router.helper";

const signupPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<Header />
			<div className="p-3 max-w-lg mx-auto">
				<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
				<form className="flex flex-col gap-3">
					<input
						type="text"
						placeholder="username"
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="email"
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="password"
						className="border focus:outline-none  p-4 rounded-lg"
					/>
					<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
						Sign Up
					</button>
				</form>
				<div className="flex gap-2 mt-5">
					<p>Have an account?</p>
					<span
						onClick={() => navigate(RouterHelper.login())}
						className="text-blue-700"
					>
						Sign in
					</span>
				</div>
			</div>
		</>
	);
};

export default signupPage;
