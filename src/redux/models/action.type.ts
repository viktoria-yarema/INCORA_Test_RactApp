import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { FetchParam } from "../../hooks/useFetch";

export interface ActionType {
	type: string;
}

export interface ActionTypeApi<T, K extends ApiMethodEnum> extends ActionType {
	payload: FetchParam<T>[K];
}
