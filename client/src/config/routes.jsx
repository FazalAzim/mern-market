import {
	HomePage,
	LoginPage,
	SignUpPage,
	AboutPage,
	ProfilePage,
} from "../pages";
import { Navigate } from "react-router-dom";

export const publicRoutes = [
	{
		path: "/",
		exact: true,
		element: <LoginPage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/signup",
		element: <SignUpPage />,
	},
];

const restrictedRoutes = [
	{
		path: "/login",
		element: <Navigate to="/" />,
	},
	{
		path: "/signup",
		element: <Navigate to="/" />,
	},
];
export const privateRoutes = [
	{
		path: "/",
		exact: true,
		element: <HomePage />,
	},
	{
		path: "/about",
		element: <AboutPage />,
	},
	{
		path: "/profile",
		element: <ProfilePage />,
	},
	...restrictedRoutes,
];
