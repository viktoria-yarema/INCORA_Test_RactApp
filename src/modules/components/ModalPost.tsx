import React, { FC } from "react";
import ModalComp from "../../components/ModalComp";

interface ModalPostProps {
	titleModal: string;
	openModal: boolean;
	onCloseModal: () => void;
	children: React.ReactNode;
	applyLabel: string;
	onApplyAction: () => void;
	onCancelAction: () => void;
}

const ModalPost: FC<ModalPostProps> = ({
	titleModal,
	openModal,
	onCloseModal,
	children,
	applyLabel,
	onApplyAction,
	onCancelAction,
}) => {
	return (
		<ModalComp
			open={openModal}
			onClose={onCloseModal}
			buttonActionData={[
				{
					label: applyLabel,
					action: onApplyAction,
				},
				{
					label: "Cancel",
					action: onCancelAction,
				},
			]}
			title={titleModal}
		>
			{children}
		</ModalComp>
	);
};

export default ModalPost;
