import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import renderRoutes from "./renderRoutes";
import { getPrivateRoutes } from "./routes";
import PrivateLayout from "../layout/PrivateLayout";

const ApplicationRouter = () => {
	return (
		<BrowserRouter>
			<PrivateLayout>
				<Routes>
					{renderRoutes(getPrivateRoutes())}{" "}
					{/* <Route
						path="*"
						element={<Navigate to={getPrivateRoutes().home.url} replace />}
					/> */}
				</Routes>
			</PrivateLayout>
		</BrowserRouter>
	);
};

export default ApplicationRouter;
