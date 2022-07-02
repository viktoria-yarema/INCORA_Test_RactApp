import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import renderRoutes from "./renderRoutes";
import { getPrivateRoutes } from "./routes";
import PrivateLayout from "../layout/PrivateLayout";

const ApplicationRouter = () => {
	return (
		<BrowserRouter>
			{/* <Routes>
				<Route
					path="*"
					element={ */}	
						<PrivateLayout>
							<Routes>
								{renderRoutes(getPrivateRoutes())}{" "}
								<Route path="*" element={getPrivateRoutes().home.element} />
							</Routes>
						</PrivateLayout>
					{/* } */}
				{/* />
				{renderRoutes(getPrivateRoutes())}{" "}
				<Route path="*" element={getPrivateRoutes().home.element} />
			</Routes>
			<Outlet /> */}
		</BrowserRouter>
	);
};

export default ApplicationRouter;
