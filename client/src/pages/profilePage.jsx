import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { Header } from "../components";

const profilePage = () => {
	const [file, setFile] = useState(undefined);
	const [progress, setProgress] = useState(0);
	const [formData, setFormData] = useState({});
	const [fileError, setFileError] = useState(false);

	const fileRef = useRef(null);
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
					<button
						disabled={progress != null && progress < 100}
						className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
					>
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
