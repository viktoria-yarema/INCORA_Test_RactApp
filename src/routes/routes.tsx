import Home from "../modules/home/Home";
import Posts from "../modules/posts/Posts";
import Users from "../modules/users/Users";

export const getPrivateRoutes = () => ({
	home: {
		url: "/",
		element: <Home />,
	},

	users: {
		url: "/",
		element: <Users />,
	},

	posts: {
		url: "/posts",
		element: <Posts />,
	},
});
