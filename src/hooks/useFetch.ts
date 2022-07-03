import { camelCase } from "lodash";
import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ENDPOINT } from "../api/api";
import { ApiMethodEnum } from "../api/models/apiMethod.enum";
import {
	ApiQueryKey,
} from "../api/models/enpoint.model";
import { ApiStoreData, StoreType } from "../redux/models/store.model";
import { apiActions } from "../redux/redux-api/api.actions";

const checkendp = "users";

type Fetch = ReturnType<typeof ENDPOINT[typeof checkendp]>;

export type FetchParam<U> = {
	[ApiMethodEnum.POST]: { data: U };
	[ApiMethodEnum.PUT]: { searchQuery: string; data: U };
	[ApiMethodEnum.DELETE]: { searchQuery: string };
	[ApiMethodEnum.GET]: { searchQuery?: string };
};

export function useFetch<T, K extends ApiMethodEnum>(
	endpoint: ApiQueryKey
): [ApiStoreData[typeof endpoint], (payload: FetchParam<T>[K]) => void] {
	const dispatch = useDispatch();
	const apiState: ApiStoreData = useSelector(
		(state: StoreType): ApiStoreData => state.api
	);

	const performFetch = useCallback(
		(payload: FetchParam<T>[K]) =>
			dispatch(apiActions<T, K>().fetchStart(endpoint, payload)),
		[dispatch, endpoint]
	);

	const response = useMemo(() => {
		return apiState[endpoint];
	}, [apiState, endpoint]);

	return [response, performFetch];
}

