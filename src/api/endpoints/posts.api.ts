import api from "./instanse";
import { Post } from "../../entities/post.entities";
import { ApiMethod } from "../models/apiMethod.enum";

export enum PostsApiEnum {
	GetPosts = "posts",
	GetPost = "post",
	UpdatePost = "updatePost",
	DeletePost = "deletePost",
}

export const PostsApi = {
	[PostsApiEnum.GetPosts.toUpperCase()]: {
		uri: `/${PostsApiEnum.GetPosts}`,
		method: ApiMethod.GET,
		// request: async function (): Promise<Post[]> {
		// 	const result = await api.get(this.uri);
		// 	return result.data;
		// },
	},

	[PostsApiEnum.GetPost.toUpperCase()]: {
		uri: `/${PostsApiEnum.GetPosts}`,
		method: ApiMethod.GET,
		// request: async function (id: string): Promise<Post> {
		// 	const result = await api.get(`${this.uri}/${id}`);
		// 	return result.data;
		// },
  },
  
  [PostsApiEnum.UpdatePost.toUpperCase()]: {
		uri: `/${PostsApiEnum.GetPosts}`,
		method: ApiMethod.PUT,
		// request: async function (id: string, data: any): Promise<Post> {
		// 	const result = await api.put(`${this.uri}/${id}`);
		// 	return result.data;
		// },
	},
};
