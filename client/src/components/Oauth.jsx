import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { setSignedIn, setUser } from "../redux/user/userSlice";

const Oauth = () => {
	const dispatch = useDispatch();

	const handleGoogleClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const response = await fetch("/api/auth/google", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: result.user.displayName,
					email: result.user.email,
					photo: result.user.photoURL,
				}),
			});
			const data = await response.json();
			dispatch(setSignedIn(true));
			dispatch(setUser(data));
		} catch (error) {
			console.log("Could not sign in with Google");
		}
	};
	return (
		<button
			onClick={handleGoogleClick}
			className="w-full bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
		>
			Continue with Google
		</button>
	);
};

export default Oauth;
