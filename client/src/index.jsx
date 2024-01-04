// import reportWebVitals from './config/reportWebVitals';
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/theme/index.css";
import "./config/globals.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { privateRoutes, publicRoutes } from "./config/routes.jsx";
import { ErrorPage } from "./pages/errorPage.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
	const auth = useSelector((state) => state.user);
	const routes = auth.isSignedIn ? privateRoutes : publicRoutes;

	return (
		<BrowserRouter>
			<Routes>
				{routes.map((route, index) => (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						element={route.element}
					/>
				))}
				<Route exact path="*" element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
