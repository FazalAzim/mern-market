import { useSelector } from "react-redux";
import { Header } from "../components";

const profilePage = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<>
			<Header />
			<div className="p-3 max-w-md mx-auto">
				<h1 className="text-3xl font-semibold text-center my-3">
					<span className="text-slate-500">Pro</span>
					<span className="text-slate-700">file</span>
				</h1>
				<form className="flex flex-col gap-3">
					<img
						src={user.avatar}
						alt="Profile"
						className="rounded-full w-24 h-24 object-cover self-center"
					/>
					<input
						type="text"
						placeholder="username"
						id="username"
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="email"
						id="email"
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="password"
						id="password"
						className="border focus:outline-none  p-4 rounded-lg"
					/>
					<button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
						update
					</button>
				</form>
				<div className="flex justify-between mt-3">
					<span className="text-red-700 cursor-pointer">Delete Account</span>
					<span className="text-red-700 cursor-pointer">Sign out</span>
				</div>
			</div>
		</>
	);
};

export default profilePage;
