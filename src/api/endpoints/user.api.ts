import { User } from "../../entities/user.entities";
import { ApiMethod } from "../models/apiMethod.enum";
import api from "./instanse";

export enum UserEnum {
  GetUsers = "users",
  GetUser = 'user',
}

export const UserApi = {
	[UserEnum.GetUsers.toUpperCase()]: {
    uri: `/${UserEnum.GetUsers}`,
		method: ApiMethod.GET,
		// request: async function (): Promise<User[]> {
		// 	const result = await api['get'](this.uri);
		// 	return result.data;
		// },
  },
  
  [UserEnum.GetUser.toUpperCase()]: {
    uri: `/${UserEnum.GetUsers}`,
    method:  ApiMethod.GET,
		// request: async function (): Promise<User> {
		// 	const result = await api['get'](this.uri);
		// 	return result.data;
		// },
	},
};
