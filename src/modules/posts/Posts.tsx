import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../api/api";
import { PostsApi } from "../../api/endpoints/posts.api";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { Post } from "../../entities/post.entities";
import { User } from "../../entities/user.entities";
import { useFetch } from "../../hooks/useFetch";
import { getPrivateRoutes } from "../../routes/routes";

const Posts = () => {
	const [posts, fetchPosts] = useFetch<Post[], ApiMethodEnum.GET>('posts');
	const [userPosts, fetchUserPosts] = useFetch<Post, ApiMethodEnum.GET>("userPosts");

	const [createPost, fetchCreatePost] = useFetch<Post, ApiMethodEnum.POST>("createPost");
	const [updatePost, fetchUpdatePost] = useFetch<Post, ApiMethodEnum.PUT>("createPost");


	// const { loading, data } = posts;

	useEffect(() => {
		fetchPosts({});
		fetchUserPosts({});
	}, []);

	return (
		<div>
			Posts
			<Link to={getPrivateRoutes().users.url}>Go to Users page</Link>
		</div>
	);
};

export default Posts;
