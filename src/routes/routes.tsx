import Post from "../modules/posts/Post";
import Posts from "../modules/posts/Posts";
import Users from "../modules/users/Users";

export const getPrivateRoutes = () => ({
	users: {
		url: "/",
		element: <Users />,
	},

	post: {
		url: "/post/:postId",
		element: <Post />,
	},

	usersPosts: {
		url: "/posts/:userId",
		element: <Posts />,
	},
});
