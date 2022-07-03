import { PostsApi} from "./endpoints/posts.api";
import { UserApi } from "./endpoints/user.api";

export const ENDPOINT = {
	...UserApi,
	...PostsApi,
};
