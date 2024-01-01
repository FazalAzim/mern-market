// import reportWebVitals from './config/reportWebVitals';
import ReactDOM from "react-dom/client";
import "./assets/theme/index.css";
import "./config/globals.jsx";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
	return <div className="bg-slate-400">Web Project</div>;
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
