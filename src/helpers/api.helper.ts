import { ENDPOINT } from "../api/api";
import api from "../api/endpoints/instanse";
import { ApiMethodEnum } from "../api/models/apiMethod.enum";
import {
	ApiQueryKey,
} from "../api/models/enpoint.model";
import { FetchParam } from "../hooks/useFetch";

export const apiHelper = async <T, K extends ApiMethodEnum>(
	endpoint: ApiQueryKey,
	payload: FetchParam<T>[K]
) => {

	console.log(payload, "payload in api helper to call");
	const {searchQuery, data} = payload as { searchQuery: string, data: T}

	
	const query = ENDPOINT[endpoint](searchQuery);

	const result = await api[query.method](query.uri, data);
	return result.data;
};
