import { useState } from "react";
import { Header } from "../components";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const listingPage = () => {
	const [files, setFiles] = useState([]);
	const [imageUploadError, setImageUploadError] = useState(false);
	const [upLoading, setUpLoading] = useState(false);
	const [formData, setFormData] = useState({
		imageUrls: [],
	});

	const handleImageSubmit = () => {
		if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
			setUpLoading(true);
			setImageUploadError(false);
			const promises = [];
			for (let index = 0; index < files.length; index++) {
				promises.push(storeImage(files[index]));
			}
			Promise.all(promises)
				.then((urls) => {
					setFormData({
						...formData,
						imageUrls: formData.imageUrls.concat(urls),
					});
					setImageUploadError(false);
					setUpLoading(false);
				})
				.catch((error) => {
					setImageUploadError("Image upload failed (2 mb max per image)");
					setUpLoading(false);
				});
		} else {
			setImageUploadError("You can only upload 6 images at a time");
			setUpLoading(false);
		}
	};

	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const storageRef = ref(storage, file.name);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(error) => {
					reject(error);
				},

				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const handleRemoveImage = (index) => {
		setFormData({
			...formData,
			imageUrls: formData.imageUrls.filter((_, item) => item !== index),
		});
	};

	return (
		<>
			<Header />
			<div className="p-4 max-w-4xl mx-auto">
				<h1 className="text-3xl font-semibold text-center my-4">
					<span className="text-slate-500">Cre</span>
					<span className="text-slate-700">ate</span>
					<span className="text-slate-500 px-2">a</span>
					<span className="text-slate-700">List</span>
					<span className="text-slate-500">ing</span>
				</h1>
				<form className="flex flex-col sm:flex-row gap-4">
					<div className="flex flex-col gap-4 flex-1">
						<input
							type="text"
							placeholder="Name"
							id="name"
							maxLength="60"
							minLength="8"
							required
							className="border focus:outline-none p-3 rounded-lg"
						/>
						<textarea
							type="text"
							placeholder="Description"
							id="Description"
							required
							className="border focus:outline-none p-3 rounded-lg"
						/>
						<input
							type="text"
							placeholder="Address"
							id="address"
							maxLength="60"
							minLength="8"
							required
							className="border focus:outline-none p-3 rounded-lg"
						/>
						<div className="flex flex-wrap gap-6">
							<div className="flex gap-2">
								<input type="checkbox" id="sale" className="w-5" />
								<span>Sell</span>
							</div>
							<div className="flex gap-2">
								<input type="checkbox" id="rent" className="w-5" />
								<span>Rent</span>
							</div>
							<div className="flex gap-2">
								<input type="checkbox" id="parking" className="w-5" />
								<span>Parking spot</span>
							</div>
							<div className="flex gap-2">
								<input type="checkbox" id="furnished" className="w-5" />
								<span>Furnished</span>
							</div>
							<div className="flex gap-2">
								<input type="checkbox" id="offer" className="w-5" />
								<span>Offer</span>
							</div>
						</div>
						<div className="flex flex-wrap gap-6">
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="bedrooms"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<p>Beds</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="bathrooms"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<p>Baths</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="regularPrice"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<div className="flex flex-col items-center">
									<p>Regular price</p>
									<span className="text-xs">($ / month)</span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="discountedPrice"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<div className="flex flex-col items-center">
									<p>Discounted Price</p>
									<span className="text-xs">($ / month)</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col flex-1 gap-4">
						<p className="font-semibold">
							Images:
							<span className="font-normal text-gray-600 ml-2">
								The first image will be the cover (max 6)
							</span>
						</p>
						<div className="flex gap-4">
							<input
								type="file"
								id="images"
								accept="image/*"
								multiple
								onChange={(e) => setFiles(e.target.files)}
								className="p-3 border border-gray-300 rounded w-full "
							/>
							<button
								type="button"
								disabled={upLoading}
								onClick={handleImageSubmit}
								className="p-3 text-gray-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
							>
								{upLoading ? "Uploading..." : "Upload"}
							</button>
						</div>
						<p className="text-red-700">
							{imageUploadError && imageUploadError}
						</p>
						{formData.imageUrls.length > 0 &&
							formData.imageUrls.map((url, index) => (
								<div
									key={index}
									className="p-3 flex justify-between border items-center"
								>
									<img
										src={url}
										alt="listing image"
										className="w-20 h-20 object-contain rounded-lg"
									/>
									<button
										type="button"
										onClick={() => handleRemoveImage(index)}
										className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75"
									>
										Delete
									</button>
								</div>
							))}
						<button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
							Create Listing
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default listingPage;
