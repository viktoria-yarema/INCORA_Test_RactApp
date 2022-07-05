import { CommentsModel, PostModel } from "../../entities/post.entities";
import { UserModel } from "../../entities/user.entities";
import { AccamulatorType } from "../redux-api/api.reducer";

export type ApiStoreData = {
	users: AccamulatorType<UserModel[]>;
	user: AccamulatorType<UserModel>;
	posts: AccamulatorType<PostModel[]>;
	userPosts: AccamulatorType<PostModel[]>;
	getPost: AccamulatorType<PostModel>;
	getComments: AccamulatorType<CommentsModel[]>;
	updatePost: AccamulatorType<PostModel>;
	deletePost: AccamulatorType<PostModel>;
	createPost: AccamulatorType<PostModel>;
};

export type StoreType = {
	api: ApiStoreData;

	router: {
		action: string;
		previousLocations: string;
		location: {
			pathname: string;
			search: string;
			hash: string;
			state: null | {};
			key: string;
		};
	};
};
