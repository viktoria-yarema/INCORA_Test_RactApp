import { CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import TableComp, { TableDataType } from "../../components/TableComp";
import { Post } from "../../entities/post.entities";
import { User } from "../../entities/user.entities";
import {
	normalizeColumnsNames,
	replaceObjectToArray,
} from "../../helpers/normalizeTableValues.helper";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import { useFetch } from "../../hooks/useFetch";
import { getPrivateRoutes } from "../../routes/routes";

const Posts = () => {
	const [user, fetchUser] = useFetch<User, ApiMethodEnum.GET>("user");
	const [userPosts, fetchUserPosts] = useFetch<Post[], ApiMethodEnum.GET>(
		"userPosts"
	);

	const { userId } = useParams();
	const navigate = useNavigate();

	const [userData, userLoading, userError] = parseAcc(user);
	const [userPostsData, userPostsLoading] = parseAcc<Post[]>(userPosts);

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

		const redirectToPost = (postId: string | undefined) =>
			navigate(`${getPrivateRoutes().post.url}/${postId}`);

		return userPostsData.map(
			item =>
				({
					data: replaceObjectToArray(item),
					// href: `${getPrivateRoutes().posts.url}/${item.id}`,
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
