import { ApiMethodEnum } from "../models/apiMethod.enum";
import { FetchQueryGet, QueryModelGet } from "../models/enpoint.model";

export enum UserApiEnum {
	GetUsers = "users",
}

// export interface IUserApi {
// 	users: FetchQueryGet;
// 	user: FetchQueryGet;
// }

export const UserApi = {
	users: (): QueryModelGet => ({
		uri: `/${UserApiEnum.GetUsers}`,
		method: ApiMethodEnum.GET,
	}),

	user: (userId: string): QueryModelGet => ({
		uri: `/${UserApiEnum.GetUsers}/${userId}`,
		method: ApiMethodEnum.GET,
	}),
};

