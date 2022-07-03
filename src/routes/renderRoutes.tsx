import { Route } from "react-router-dom";
import { RoutesType } from "./route.model";

const renderRoutes = (
	routes: RoutesType<any>,
	basePath: string = ""
): JSX.Element[] =>
	Object.entries(routes).map(([key, route]) => (
		<Route key={key} path={basePath + route.url} element={route.element} />
	));

export default renderRoutes;
