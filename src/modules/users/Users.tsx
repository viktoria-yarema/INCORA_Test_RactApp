import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { CircularProgress, Container, Typography } from "@mui/material";
import { UserModel } from "../../entities/user.entities";
import { useFetch } from "../../hooks/useFetch";
import { getPrivateRoutes } from "../../routes/routes";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import {
	normalizeColumnsNames,
	replaceObjectToArray,
} from "../../helpers/normalizeTableValues.helper";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";

import TableComp, { TableDataType } from "../../components/TableComp";

const Users = () => {
	const [users, fetchUsers] = useFetch<UserModel[], ApiMethodEnum.GET>("users");

	useEffect(() => {
		fetchUsers({ searchQuery: undefined });
	}, [fetchUsers]);

	const navigate = useNavigate();

	const [usersData, usersLoading] = parseAcc(users);

	const columnsNames = useMemo(() => {
		if (!usersData) {
			return;
		}
		return normalizeColumnsNames(usersData, true);
	}, [usersData]);

	const tableData = useMemo(() => {
		if (!usersData) {
			return;
		}

		const redirectToPost = (userId: number | undefined) =>
			userId &&
			navigate(
				`${getPrivateRoutes().usersPosts.url.replace(":userId", userId.toString())}`,
				{ replace: true }
			);

		return usersData.map(
			item =>
				({
					data: replaceObjectToArray(item),
					event: () => redirectToPost(item.id),
				} as TableDataType)
		);
	}, [navigate, usersData]);

	return (
		<>
			{usersLoading ? (
				<CircularProgress />
			) : (
				<Container>
					<Typography variant="h2" component="h2">
						Users
					</Typography>

					{columnsNames && tableData && (
						<TableComp
							columnNames={columnsNames}
							tableData={tableData}
							button={{
								label: "Posts",
							}}
						/>
					)}
				</Container>
			)}
		</>
	);
};

export default Users;
