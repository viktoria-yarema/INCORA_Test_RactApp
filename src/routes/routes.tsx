import Post from "../modules/posts/Post";
import Posts from "../modules/posts/Posts";
import Users from "../modules/users/Users";

export const getPrivateRoutes = () => ({
	users: {
		url: "/",
		element: <Users />,
	},

	posts: {
		url: "/posts",
		element: <Users />,
	},

	post: {
		url: "/posts/:postId",
		element: <Post />,
	},

	usersPosts: {
		url: "/posts/:userId",
		element: <Posts />,
	},
});
