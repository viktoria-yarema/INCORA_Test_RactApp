import { ApiMethodEnum } from "../../api/models/apiMethod.enum";
import { ApiQueryKey } from "../../api/models/enpoint.model";
import { FetchParam } from "../../hooks/useFetch";
import { API_ACTIONS } from "../redux-api/api.actions";

export type KeysApiActions = keyof typeof API_ACTIONS;

export type ActionType = `${KeysApiActions}_${ApiQueryKey}`;

export interface ActionTypeApi<T, K extends ApiMethodEnum> {
	type: ActionType;
	payload: FetchParam<T>[K];
}
