import Home from "../modules/home/Home";
import Post from "../modules/posts/Post";
import Posts from "../modules/posts/Posts";
import Users from "../modules/users/Users";

export const getPrivateRoutes = () => ({
	home: {
		url: "/",
		element: <Home />,
	},

	users: {
		url: "/users",
		element: <Users />,
	},

	posts: {
		url: "/posts",
		element: <Home />,
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
