import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { useFetch } from "../../hooks/useFetch";
import { apiStore } from "../../redux/redux-api/api.selector";
import { PostModel, CommentsModel } from "../../entities/post.entities";
import { UserModel } from "../../entities/user.entities";
import { parseAcc } from "../../helpers/parseAcc.helper.";
import {
	Card,
	CircularProgress,
	Container,
	Divider,
	Stack,
	Typography,
	Button,
} from "@mui/material";
import { Box } from "@mui/system";
import ModalComp from "../../components/ModalComp";

const Post = () => {
	const [updatedPost, setUpdatedPost] = useState<PostModel | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [userPosts, fetchUserPosts] = useFetch<PostModel, ApiMethodEnum.GET>(
		"getPost"
	);
	const [postComments, fetchComments] = useFetch<
		CommentsModel[],
		ApiMethodEnum.GET
	>("getComments");

	const [updatePost, fetchUpdatePost] = useFetch<PostModel, ApiMethodEnum.PUT>(
		"updatePost"
	);

	const { postId } = useParams();

	useEffect(() => {
		postId && fetchUserPosts({ searchQuery: postId });
		postId && fetchComments({ searchQuery: postId });
	}, [fetchComments, fetchUserPosts, postId]);

	// useEffect(() => {

	// }, [fetchComments, postId]);

	const apiState = useSelector(apiStore<UserModel>);
	const [userPostData, userPostLoading] = parseAcc(userPosts);
	const [postCommentstData, postCommentsLoading] = parseAcc(postComments);
	const [updatePostData, updatePostLoading, updatePostError] =
		parseAcc(updatePost);

	const { user } = apiState;

	const renderComments = () => {
		return postCommentstData?.map(comment => (
			<Card>
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
					<ModalComp open={openModal} onClose={() => setOpenModal(false)}>
						Modal
					</ModalComp>
					<Typography variant="h2" component="h2">
						Post details
					</Typography>
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
							<Typography variant="overline" align="right">
								{userPostData?.title}
							</Typography>
						</Stack>
						<Stack direction="row" spacing={2} alignItems="center">
							<Typography variant="h6" fontWeight="bold">
								Content:
							</Typography>
							<Typography variant="body1">{userPostData?.body}</Typography>
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
								// onClick={() => {
								// 	updatedPost &&
								// 		postId &&
								// 		fetchUpdatePost({
								// 			searchQuery: postId,
								// 			data: updatedPost,
								// 		});
								// 	// !!!updatePostError && setUpdatedPost(null);
								// }}
									onClick={() => setOpenModal(true)}
							>
								Edit
							</Button>
							<Button variant="contained" color="error">
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
