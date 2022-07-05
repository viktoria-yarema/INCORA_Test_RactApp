import { ApiMethodEnum } from "../models/apiMethod.enum";
import {
	QueryModel
} from "../models/enpoint.model";

export enum PostsApiRoutesEnum {
	GetPosts = "posts",
	GetComments = "comments",
}

export const PostsApi = {
	posts: (): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}`,
		method: ApiMethodEnum.GET,
	}),

	userPosts: (userId: string): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}?userId=${userId}`,
		method: ApiMethodEnum.GET,
	}),

	getPost: (postId: string): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.GET,
	}),

	getComments: (postId: string): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetComments}?postId=${postId}`,
		method: ApiMethodEnum.GET,
	}),

	updatePost: (postId: string): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.PUT,
	}),

	deletePost: (postId: string): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.DELETE,
	}),

	createPost: (): QueryModel => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}`,
		method: ApiMethodEnum.POST,
	}),
};
