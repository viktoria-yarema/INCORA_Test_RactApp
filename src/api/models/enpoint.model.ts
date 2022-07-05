import { ApiStoreData } from "../../redux/models/store.model";
import { ApiMethodEnum } from "./apiMethod.enum";

export type ApiQueryKey = keyof ApiStoreData;

export interface QueryModel {
	uri: string;
	method: ApiMethodEnum;
}
// export interface QueryModelGet {
// 	uri: string;
// 	method: ApiMethodEnum.GET;
// }

// export interface QueryModelPost {
// 	uri: string;
// 	method: ApiMethodEnum.POST;
// }

// export interface QueryModelPut {
// 	uri: string;
// 	method: ApiMethodEnum.PUT;
// }

// export interface QueryModelDelete {
// 	uri: string;
// 	method: ApiMethodEnum.DELETE;
// }
