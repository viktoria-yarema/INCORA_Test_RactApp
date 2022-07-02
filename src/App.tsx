import { CssBaseline } from "@mui/material";
import React from "react";
import "./App.css";
import ApplicationRouter from "./routes/ApplicationRouter";

function App() {
	return (
		<>
			<CssBaseline />
			<ApplicationRouter />
		</>
	);
}

export default App;
