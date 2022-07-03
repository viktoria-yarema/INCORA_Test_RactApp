import { ENDPOINT } from "../../api/api";
import { Post } from "../../entities/post.entities";
import { User } from "../../entities/user.entities";
import { AccamulatorType } from "../redux-api/api.reducer";

export interface ApiStoreData {
	users: AccamulatorType<User[]>;
	user: AccamulatorType<User>;
	posts: AccamulatorType<Post[]>;
	userPosts: AccamulatorType<Post[]>;
	updatePost: AccamulatorType<Post>;
	deletePost: AccamulatorType<Post>;
	createPost: AccamulatorType<Post>;
}

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
