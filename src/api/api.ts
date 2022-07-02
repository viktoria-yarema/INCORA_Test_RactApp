import { PostsApi } from "./endpoints/posts.api";
import { UserApi, UserEnum } from "./endpoints/user.api";

export const ApiMergeEnums = { ...UserEnum };

export type ApiType = typeof ApiMergeEnums;

export const ENDPOINT = {
	...UserApi,
	...PostsApi,
};
