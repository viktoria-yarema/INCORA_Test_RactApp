import { CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import TableComp, { TableDataType } from "../../components/TableComp";
import { PostModel } from "../../entities/post.entities";
import { UserModel } from "../../entities/user.entities";
import {
	normalizeColumnsNames,
	replaceObjectToArray,
} from "../../helpers/normalizeTableValues.helper";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import { useFetch } from "../../hooks/useFetch";
import { getPrivateRoutes } from "../../routes/routes";

const Posts = () => {
	const [user, fetchUser] = useFetch<UserModel, ApiMethodEnum.GET>("user");
	const [userPosts, fetchUserPosts] = useFetch<PostModel[], ApiMethodEnum.GET>(
		"userPosts"
	);

	const { userId } = useParams();
	const navigate = useNavigate();

	const [userData, userLoading, userError] = parseAcc(user);
	const [userPostsData, userPostsLoading] = parseAcc<PostModel[]>(userPosts);

	useEffect(() => {
		if (userId) {
			fetchUser({ searchQuery: userId });
			fetchUserPosts({ searchQuery: userId });
		}
	}, [fetchUser, fetchUserPosts, userId]);

	const postsColumnsNames = useMemo(() => {
		if (!userPostsData) {
			return;
		}
		return normalizeColumnsNames(userPostsData, true);
	}, [userPostsData]);

	const postsTableData = useMemo(() => {
		if (!userPostsData) {
			return;
		}

		const redirectToPost = (postId: number | undefined) =>
			postId &&
			navigate(
				`${getPrivateRoutes().post.url.replace(":postId", postId.toString())}`,
				{ replace: true }
			);

		return userPostsData.map(
			item =>
				({
					data: replaceObjectToArray(item),
					event: () => redirectToPost(item.id),
				} as TableDataType)
		);
	}, [navigate, userPostsData]);

	return (
		<Container>
			{userLoading ? (
				<CircularProgress />
			) : (
				<>
					{" "}
					{!userError ? (
						<>
							<Typography variant="h2" component="h2">
								Posts of {userData?.name}
							</Typography>
							{postsColumnsNames && postsTableData && (
								<>
									{userPostsLoading ? (
										<CircularProgress />
									) : (
										<TableComp
											columnNames={postsColumnsNames}
											tableData={postsTableData}
											button={{ label: "Details" }}
										/>
									)}
								</>
							)}
						</>
					) : (
						<Typography variant="h2" component="h2">
							Sorry, this user not exist
						</Typography>
					)}
				</>
			)}
		</Container>
	);
};

export default Posts;
