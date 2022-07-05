import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { FC } from "react";

interface ModalCompProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const ModalComp: FC<ModalCompProps> = ({ open, onClose, children }) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
			sx={{
				width: "800px",
				height: "800px",
				backgroundColor: "lightblue",
			}}
			>
				{children}
			</Box>
		</Modal>
	);
};

export default ModalComp;
