// import reportWebVitals from './config/reportWebVitals';
import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/theme/index.css";
import "./config/globals.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./config/routes.jsx";
import { ErrorPage } from "./pages/errorPage.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
const App = () => {
	const routes = privateRoutes;
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
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
