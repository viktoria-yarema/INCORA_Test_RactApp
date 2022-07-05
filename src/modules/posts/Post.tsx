import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { useFetch } from "../../hooks/useFetch";
import { apiStore } from "../../redux/redux-api/api.selector";
import { PostModel, CommentsModel } from "../../entities/post.entities";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import {
	Card,
	CircularProgress,
	Container,
	Divider,
	Stack,
	Typography,
	Button,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { apiActions } from "../../redux/redux-api/api.actions";
import { getPrivateRoutes } from "../../routes/routes";
import ModalPost from "./components/ModalPost";

const Post = () => {
	const [updatedPost, setUpdatedPost] = useState<Omit<
		PostModel,
		"id" | "userId"
	> | null>(null);
	const [openEditModal, setOpenEditModal] = useState<boolean>(false);
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

	const [userPost, fetchUserPost] = useFetch<PostModel, ApiMethodEnum.GET>(
		"getPost"
	);
	const [postComments, fetchComments] = useFetch<
		CommentsModel[],
		ApiMethodEnum.GET
	>("getComments");
	const [updatePost, fetchUpdatePost] = useFetch<PostModel, ApiMethodEnum.PUT>(
		"updatePost"
	);
	const [deletePost, fetchDeletePost] = useFetch<
		PostModel,
		ApiMethodEnum.DELETE
	>("deletePost");

	const apiState = useSelector(apiStore);
	const { user, userPosts, createPost } = apiState;
	const { postId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		postId && fetchUserPost({ searchQuery: postId });
		postId && fetchComments({ searchQuery: postId });
	}, [fetchComments, fetchUserPost, postId]);

	const [userPostData, userPostLoading] = parseAcc(userPost);
	const [postCommentstData, postCommentsLoading] = parseAcc(postComments);
	const [updatePostData, updatePostLoading, updatePostError] =
		parseAcc(updatePost);
	const [, , deletePostError] = parseAcc(deletePost);

	const onApplyUpdatePost = useCallback(() => {
		updatedPost &&
			postId &&
			userPostData &&
			fetchUpdatePost({
				searchQuery: postId,
				data: { ...userPostData, ...updatedPost },
			});

		if (!!!updatePostError) {
			setUpdatedPost(null);
			setOpenEditModal(false);
		}
	}, [fetchUpdatePost, postId, updatePostError, updatedPost, userPostData]);

	const onDeletePost = useCallback(() => {
		postId &&
			fetchDeletePost({
				searchQuery: postId,
			});

		// Simulation of removal from the server
		const removeDeletedPost =
			userPosts?.data?.filter(post => post.id.toString() !== postId) || null;
		dispatch(apiActions().fetchSuccess("userPosts", removeDeletedPost as any));

		navigate(
			`${getPrivateRoutes().usersPosts.url.replace(
				":userId",
				user.data?.id.toString() || ""
			)}`,
			{ replace: true }
		);

		!!!deletePostError && setOpenDeleteModal(false);
	}, [
		deletePostError,
		dispatch,
		fetchDeletePost,
		navigate,
		postId,
		user.data?.id,
		userPosts?.data,
	]);

	const renderComments = () => {
		return postCommentstData?.map((comment: CommentsModel, index: number) => (
			<Card key={`comment-key-${index}`}>
				<Stack direction="column" spacing={0.5}>
					<Typography variant="caption">email: {comment.email}</Typography>
					<Typography variant="subtitle2">{comment.name}</Typography>
					<Typography variant="body1">{comment.body}</Typography>
				</Stack>
			</Card>
		));
	};

	return (
		<Container>
			{userPostLoading ? (
				<CircularProgress />
			) : (
				<>
					{postId && userPostData && (
						<>
							{" "}
							<ModalPost
								openModal={openEditModal}
								onCloseModal={() => setOpenEditModal(false)}
								applyLabel="Edit"
								onApplyAction={onApplyUpdatePost}
								onCancelAction={() => setOpenEditModal(false)}
								titleModal="Edit Post"
							>
								<TextField
									label="Title"
									value={updatedPost?.title}
									onChange={event =>
										setUpdatedPost({
											body: updatedPost?.body || "",
											title: event.target.value,
										})
									}
									margin="dense"
								/>
								<TextField
									label="Body"
									margin="dense"
									value={updatedPost?.body}
									onChange={event =>
										setUpdatedPost({
											title: updatedPost?.title || "",
											body: event.target.value,
										})
									}
								/>
							</ModalPost>
							<ModalPost
								openModal={openDeleteModal}
								onCloseModal={() => setOpenDeleteModal(false)}
								applyLabel="Delete"
								onApplyAction={onDeletePost}
								onCancelAction={() => setOpenDeleteModal(false)}
								titleModal="Delete Post"
							>
								<Typography variant="h6">
									{" "}
									Are you sure delete this Post?
								</Typography>
							</ModalPost>
						</>
					)}
					<Stack justifyContent="space-between" direction={"row"}>
						<Typography variant="h2" component="h2">
							Post details
						</Typography>
						<Link to={`${getPrivateRoutes().users}`}>
							<Button>Go to Users page</Button>
						</Link>
					</Stack>

					<Typography variant="h4" fontWeight="bold">
						Author is {user?.data?.name}
					</Typography>
					<Divider />
					<Stack spacing={1} margin="10px">
						<Typography variant="h5" color="orange">
							Details:{" "}
						</Typography>
						<Stack direction="row" spacing={2} alignContent="center">
							<Typography variant="h6" fontWeight="bold">
								Title:
							</Typography>
							{updatePostLoading ? (
								<CircularProgress />
							) : (
								<Typography variant="overline" align="right">
									{createPost?.data?.title ||
										updatePostData?.title ||
										userPostData?.title}
								</Typography>
							)}
						</Stack>
						<Stack direction="row" spacing={2} alignItems="center">
							<Typography variant="h6" fontWeight="bold">
								Content:
							</Typography>
							{updatePostLoading ? (
								<CircularProgress />
							) : (
								<Typography variant="body1">
									{createPost?.data?.body ||
										updatePostData?.body ||
										userPostData?.body}
								</Typography>
							)}
						</Stack>
						<Box
							component="div"
							sx={{
								maxWidth: "300px",
								display: "flex",
								columnGap: "15px",
								margin: "15px 0",
							}}
							alignSelf="flex-end"
						>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									setUpdatedPost({
										title: updatePostData?.title || userPostData?.title || "",
										body: updatePostData?.body || userPostData?.body || "",
									});
									setOpenEditModal(true);
								}}
							>
								Edit
							</Button>
							<Button
								variant="contained"
								color="error"
								onClick={() => setOpenDeleteModal(true)}
							>
								Delete
							</Button>
						</Box>
					</Stack>

					<Divider />
					{postCommentsLoading ? (
						<CircularProgress />
					) : (
						<Stack direction="column" margin="10px">
							<Typography variant="h5" color="orange" marginBottom="10px">
								Comments:
							</Typography>
							<Stack direction="column" spacing={1}>
								{renderComments()}
							</Stack>
						</Stack>
					)}
				</>
			)}
		</Container>
	);
};

export default Post;
