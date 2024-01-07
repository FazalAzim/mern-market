import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { Header } from "../components";
import { setSignedIn, setUser } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { RouterHelper } from "../helpers/router.helper";

const profilePage = () => {
	const [file, setFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [formData, setFormData] = useState({});
	const [fileError, setFileError] = useState(false);
	const [dataLoading, setDataLoading] = useState(false);
	const [updateSuccess, setUpdateSuccess] = useState(false);

	const fileRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		file && handleFileUpLoads();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	const handleFileUpLoads = () => {
		const storage = getStorage(app);
		const storageRef = ref(storage, file.name);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(Math.round(progress));
			},
			(error) => {
				setFileError(true);
			},

			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, avatar: downloadURL });
				});
			}
		);
	};

	const handleChange = async (event) => {
		setFormData({ ...formData, [event.target.id]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setDataLoading(true);
			const response = await fetch(`/api/user/update/${user._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			dispatch(setUser(data));
			setDataLoading(false);
			setUpdateSuccess(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteUser = async () => {
		try {
			const response = await fetch(`/api/user/delete/${user._id}`, {
				method: "DELETE",
			});
			await response.json();
			dispatch(setUser({}));
			dispatch(setSignedIn(false));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleSignOut = async () => {
		try {
			const response = await fetch("/api/auth/signout");
			await response.json();
			dispatch(setUser({}));
			dispatch(setSignedIn(false));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header />
			<div className="p-3 max-w-md mx-auto">
				<h1 className="text-3xl font-semibold text-center my-3">
					<span className="text-slate-500">Pro</span>
					<span className="text-slate-700">file</span>
				</h1>
				<form className="flex flex-col gap-3">
					<input
						onChange={(e) => setFile(e.target.files[0])}
						type="file"
						ref={fileRef}
						hidden
						accept="image/*"
					/>
					<img
						onClick={() => fileRef.current.click()}
						src={formData.avatar || user.avatar}
						alt="Profile"
						className="rounded-full w-24 h-24 object-cover self-center"
					/>
					<p className="text-sm self-center">
						{fileError ? (
							<span className="text-red-700">
								Error Image Upload (image must be less than 2 mb)
							</span>
						) : progress > 0 && progress < 100 ? (
							<span className="text-slate-700">{`Uploading ${progress}%`}</span>
						) : progress === 100 ? (
							<span className="text-green-700">
								Image Successfully Uploaded
							</span>
						) : (
							""
						)}
					</p>
					<input
						type="text"
						placeholder="username"
						id="username"
						defaultValue={user.username}
						onChange={handleChange}
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="text"
						placeholder="email"
						id="email"
						defaultValue={user.email}
						onChange={handleChange}
						className="border focus:outline-none p-4 rounded-lg"
					/>
					<input
						type="password"
						placeholder="password"
						id="password"
						onChange={handleChange}
						className="border focus:outline-none  p-4 rounded-lg"
					/>
					<button
						onClick={handleSubmit}
						disabled={dataLoading}
						className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
					>
						{dataLoading ? "loading..." : "update"}
					</button>
					<button
						onClick={() => navigate(RouterHelper.listingPath())}
						className="w-full bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
					>
						create listing
					</button>
				</form>
				<div className="flex justify-between mt-3">
					<span
						onClick={handleDeleteUser}
						className="text-red-700 cursor-pointer"
					>
						Delete Account
					</span>
					<span onClick={handleSignOut} className="text-red-700 cursor-pointer">
						Sign out
					</span>
				</div>
				<span className="text-red-700 mt-5">
					{updateSuccess ? "User update successfully" : ""}
				</span>
			</div>
		</>
	);
};

export default profilePage;
