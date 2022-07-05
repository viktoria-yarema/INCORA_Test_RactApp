import { ENDPOINT } from "../api";
import { ApiMethodEnum } from "./apiMethod.enum";

export type ApiQueryKey = keyof typeof ENDPOINT;

export type FetchQueryGet = (searchParamsGet?: string | never) => QueryModelGet;

export type FetchQueryPost = () => QueryModelPost;

export type FetchQueryPut = (searchParamsPut: string) => QueryModelPut;

export type FetchQueryDelete = (searchParamsDelete: string) => QueryModelDelete;

export interface QueryModelGet {
	uri: string;
	method: ApiMethodEnum.GET;
}

export interface QueryModelPost {
	uri: string;
	method: ApiMethodEnum.POST;
}

export interface QueryModelPut {
	uri: string;
	method: ApiMethodEnum.PUT;
}

export interface QueryModelDelete {
	uri: string;
	method: ApiMethodEnum.DELETE;
}
