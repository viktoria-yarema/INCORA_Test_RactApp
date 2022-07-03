import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import {
	RequestDataGet,
	RequestDataDelete,
	RequestDataPost,
	RequestDataPut,
} from "../../api/models/enpoint.model";
import { User } from "../../entities/user.entities";
import { FetchParam } from "../../hooks/useFetch";

export interface ActionType {
	type: string;
}

export interface ActionTypeApi<T, K extends ApiMethodEnum > extends ActionType {
	// payload?: null | Promise<T[] | T> | boolean;
	payload: FetchParam<T>[K];
		// | { data: T }
		// | { searchQuery: string; data: T }
		// | { searchQuery: string }
		// | { searchQuery?: string };
}
