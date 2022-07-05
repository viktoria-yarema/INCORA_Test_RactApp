import { UserModel } from "./user.entities";

export interface PostModel {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface CommentsModel
	extends Pick<UserModel, "name" | "email" | "id">,
		Pick<PostModel, "body"> {
	postId: string;
}
