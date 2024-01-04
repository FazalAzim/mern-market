import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouterHelper } from "../helpers/router.helper";

const Header = () => {
	const navigate = useNavigate();
	const auth = useSelector((state) => state.user);
	console.log(auth);
	return (
		<header className="bg-slate-200 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
					<span className="text-slate-500">Global</span>
					<span className="text-slate-700">State</span>
				</h1>
				<form className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input
						type="text"
						placeholder="Search..."
						className="bg-transparent focus:outline-none w-24 sm:w-64"
					/>
					<FaSearch className="text-slate-600" />
				</form>
				<ul className="flex gap-4">
					<li
						onClick={() => navigate(RouterHelper.homePath())}
						className="hidden sm:inline font-medium text-slate-700 hover:underline"
					>
						Home
					</li>
					<li
						onClick={() => navigate(RouterHelper.aboutPath())}
						className="hidden sm:inline font-medium text-slate-700 hover:underline"
					>
						About
					</li>
					{auth.isSignedIn ? (
						<img
							src={auth.user.avatar}
							alt="Profile"
							className="rounded-full h-7 w-7 object-cover cursor-pointer"
							onClick={() => navigate(RouterHelper.profilePath())}
						/>
					) : (
						<li
							onClick={() => navigate(RouterHelper.login())}
							className="font-medium text-slate-700 hover:underline"
						>
							Sign In
						</li>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;
