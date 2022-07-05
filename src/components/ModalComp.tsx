import {
	Box,
	Button,
	ButtonGroup,
	Modal,
	Stack,
	Typography,
} from "@mui/material";
import React, { FC } from "react";

type ButtonActionsType = {
	label: string;
	action: () => void;
};

interface ModalCompProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	buttonActionData?: ButtonActionsType[];
}

const ModalComp: FC<ModalCompProps> = ({
	open,
	onClose,
	title,
	buttonActionData,
	children,
}) => {
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
					maxWidth: "80%",
					maxHeight: "70%",
					minWidth: "50%",
					backgroundColor: "#F2F2F2",
					borderRadius: "6px",
				}}
			>
				<Stack
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						height: "100%",
						padding: "15px",
					}}
				>
					<Stack marginBottom={"25px"}>
						<Typography variant="h5" marginBottom={"15px"}>
							{title}
						</Typography>
						{children}
					</Stack>

					{!!buttonActionData?.length && (
						<ButtonGroup disableElevation variant="contained">
							{buttonActionData?.map((button, index) => (
								<Button key={`button-action-${index}`} onClick={button.action}>
									{button.label}
								</Button>
							))}
						</ButtonGroup>
					)}
				</Stack>
			</Box>
		</Modal>
	);
};

export default ModalComp;
