import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, generatePath, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	CircularProgress,
	Container,
	Typography,
	TextField,
	Button,
	AppBar,
} from "@mui/material";

import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { PostModel } from "../../entities/post.entities";
import { UserModel } from "../../entities/user.entities";
import { useFetch } from "../../hooks/useFetch";
import {
	normalizeColumnsNames,
	replaceObjectToArray,
} from "../../helpers/normalizeTableValues.helper";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import { apiActions } from "../../redux/redux-api/api.actions";
import { apiStore } from "../../redux/redux-api/api.selector";
import { getPrivateRoutes } from "../../routes/routes";

import TableComp, { TableDataType } from "../../components/TableComp";
import ModalPost from "./components/ModalPost";

const Posts = () => {
	const [createPost, setCreatePost] = useState<Omit<
		PostModel,
		"id" | "userId"
	> | null>(null);
	const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

	const [user, fetchUser] = useFetch<UserModel, ApiMethodEnum.GET>("user");
	const [posts, fetchPosts] = useFetch<PostModel[], ApiMethodEnum.GET>("posts");
	const [userPostsFetch, fetchUserPostsFetch] = useFetch<
		PostModel[],
		ApiMethodEnum.GET
	>("userPosts");
	const [createPostFetch, fetchCreatePostFetch] = useFetch<
		PostModel,
		ApiMethodEnum.POST
	>("createPost");

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const apiState = useSelector(apiStore);
	const { userId } = useParams();
	const { userPosts } = apiState;

	const [userData, userLoading, userError] = parseAcc(user);
	const [, , createPostFetchError] = parseAcc(createPostFetch);
	const [userPostsData, userPostsLoading] =
		parseAcc<PostModel[]>(userPostsFetch);
	const [postsData] = parseAcc<PostModel[]>(posts);

	useEffect(() => {
		if (userId) {
			fetchUser({ searchQuery: userId });
			fetchPosts({});
			!userPosts.data?.length && fetchUserPostsFetch({ searchQuery: userId });
		}
	}, [fetchPosts, fetchUser, fetchUserPostsFetch, userId, userPosts.data]);

	const onApplyCreatePost = useCallback(() => {
		// Add mock post id for display,
		// with real data I expect post id from server
		const nextPostId = postsData && postsData.length + 1;
		const post = userId &&
			createPost && {
				userId: +userId,
				id: nextPostId as number,
				...createPost,
			};

		createPost &&
			userId &&
			post &&
			fetchCreatePostFetch({
				data: post,
			});

		// Simulation  adding post from the server
		const addPost = userPosts?.data && [...userPosts?.data, post];
		dispatch(apiActions().fetchSuccess("userPosts", addPost as any));

		if (!!!createPostFetchError) {
			setCreatePost(null);
			setOpenCreateModal(false);
		}
	}, [
		createPost,
		createPostFetchError,
		dispatch,
		fetchCreatePostFetch,
		postsData,
		userId,
		userPosts?.data,
	]);

	const postsColumnsNames = useMemo(() => {
		if (!userPostsData || !userPosts.data) {
			return;
		}
		return normalizeColumnsNames(userPosts.data || userPostsData, true);
	}, [userPosts, userPostsData]);

	const postsTableData = useMemo(() => {
		if (!userPostsData || !userPosts.data) {
			return;
		}

		const redirectToPost = (postId: number | undefined) =>
			postId &&
			navigate(
				generatePath(getPrivateRoutes().post.url, {
					postId: postId.toString(),
				}),
				{ replace: true }
			);
		const tableDataToNormlize = userPosts.data || userPostsData;
		return tableDataToNormlize.map(
			item =>
				({
					data: replaceObjectToArray(item),
					event: () => redirectToPost(item.id),
				} as TableDataType)
		);
	}, [navigate, userPosts.data, userPostsData]);

	return (
		<>
			<AppBar position="static" color="transparent">
				<Link to={`${getPrivateRoutes().users}`}>
					<Button
						sx={{
							marginLeft: "30px",
						}}
					>
						Go to Users page
					</Button>
				</Link>
			</AppBar>
			<Container>
				{userLoading ? (
					<CircularProgress />
				) : (
					<>
						{" "}
						{!userError ? (
							<>
								<ModalPost
									openModal={openCreateModal}
									onCloseModal={() => setOpenCreateModal(false)}
									applyLabel="Create"
									onApplyAction={onApplyCreatePost}
									onCancelAction={() => setOpenCreateModal(false)}
									titleModal="Add Post"
								>
									<TextField
										label="Title"
										value={createPost?.title || ""}
										onChange={event =>
											setCreatePost({
												body: createPost?.body || "",
												title: event.target.value,
											})
										}
										margin="dense"
									/>
									<TextField
										label="Body"
										margin="dense"
										value={createPost?.body || ""}
										onChange={event =>
											setCreatePost({
												title: createPost?.title || "",
												body: event.target.value,
											})
										}
									/>
								</ModalPost>
								<Typography variant="h2" component="h2">
									Posts of {userData?.name}
								</Typography>
								<Button
									variant="outlined"
									color="success"
									onClick={() => setOpenCreateModal(true)}
								>
									Add Post
								</Button>
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
		</>
	);
};

export default Posts;
