import { User } from "./user.entities";

export interface Post {
	userId: string;
	id: string;
	title: string;
	body: string;
}

export interface Comments
	extends Pick<User, "name" | "email" | "id">,
		Pick<Post, "body"> {
	postId: string;
}
