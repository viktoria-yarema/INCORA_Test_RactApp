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

export interface RequestDataGet {
	searchQuery: string;
}

export interface RequestDataPost<T> {
	data: T;
}

export interface RequestDataPut<T> {
	searchQuery: string;
	data: T;
}

export interface RequestDataDelete {
	searchQuery: string;
}

export type GetFetchParamsObjType<U, DataType> = U extends FetchQueryGet
	? RequestDataGet
	: U extends FetchQueryPost
	? Required<RequestDataPost<DataType>>
	: U extends FetchQueryPut
	? Required<RequestDataPut<DataType>>
	: U extends FetchQueryDelete
	? Required<RequestDataDelete>
	: undefined;
