import { ApiMethodEnum } from "../models/apiMethod.enum";
import { QueryModel } from "../models/enpoint.model";

export enum UserApiEnum {
	GetUsers = "users",
}

export const UserApi = {
	users: (): QueryModel => ({
		uri: `/${UserApiEnum.GetUsers}`,
		method: ApiMethodEnum.GET,
	}),

	user: (userId: string): QueryModel => ({
		uri: `/${UserApiEnum.GetUsers}/${userId}`,
		method: ApiMethodEnum.GET,
	}),
};
