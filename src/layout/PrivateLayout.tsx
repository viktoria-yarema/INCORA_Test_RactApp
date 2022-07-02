import React, { FC } from "react";
import { Outlet } from "react-router-dom";
interface PrivateLayoutProps {
	children?: React.ReactNode;
}

const PrivateLayout: FC<PrivateLayoutProps> = ({ children }) => {
	return (
		<div>
			{children}
			<Outlet />
		</div>
	);
};

export default PrivateLayout;
