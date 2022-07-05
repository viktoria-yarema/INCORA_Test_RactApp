import { ApiMethodEnum } from "../models/apiMethod.enum";
import {
	// FetchQueryGet,
	// FetchQueryPut,
	// FetchQueryPost,
	// FetchQueryDelete,
	QueryModelPost,
	QueryModelDelete,
	QueryModelGet,
	QueryModelPut,
} from "../models/enpoint.model";

export enum PostsApiRoutesEnum {
	GetPosts = "posts",
	GetComments = "comments",
}

// interface IPostApi {
// 	posts: FetchQueryGet;
// 	userPosts: FetchQueryGet;
// 	updatePost: FetchQueryPut;
// 	deletePost: FetchQueryDelete;
// 	createPost: FetchQueryPost;
// }

export const PostsApi = {
	posts: (): QueryModelGet => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}`,
		method: ApiMethodEnum.GET,
	}),

	userPosts: (userId: string): QueryModelGet => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}?userId=${userId}`,
		method: ApiMethodEnum.GET,
	}),

	getPost: (postId: string): QueryModelGet => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.GET,
	}),

	getComments: (postId: string): QueryModelGet => ({
		uri: `/${PostsApiRoutesEnum.GetComments}?postId=${postId}`,
		method: ApiMethodEnum.GET,
	}),

	updatePost: (postId: string): QueryModelPut => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.PUT,
	}),

	deletePost: (postId: string): QueryModelDelete => ({
		uri: `/${PostsApiRoutesEnum.GetPosts}/${postId}`,
		method: ApiMethodEnum.DELETE,
	}),

	// createPost: (): QueryModelPost => ({
	// 	uri: `/${PostsApiRoutesEnum.GetPosts}`,
	// 	method: ApiMethodEnum.POST,
	// }),
};
