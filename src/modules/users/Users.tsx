import React, { useEffect, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { ENDPOINT } from "../../api/api";
import { UserApi, UserApiEnum } from "../../api/endpoints/user.api";
import TableComp, { TableDataType } from "../../components/TableComp";
import { CircularProgress, Container, Typography } from "@mui/material";
import { User } from "../../entities/user.entities";
import { useFetch } from "../../hooks/useFetch";

import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getPrivateRoutes } from "../../routes/routes";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import {
	normalizeColumnsNames,
	replaceObjectToArray,
} from "../../helpers/normalizeTableValues.helper";

const Users = () => {
	const [users, fetchUsers] = useFetch<User[], ApiMethodEnum.GET>("users");

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

		const redirectToPost = (userId: string | undefined) =>
			navigate(`${getPrivateRoutes().posts.url}/${userId}`);

		return usersData.map(
			item =>
				({
					data: replaceObjectToArray(item),
					// href: `${getPrivateRoutes().posts.url}/${item.id}`,
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
