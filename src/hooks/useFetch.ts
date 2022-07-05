import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApiMethodEnum } from "../api/models/apiMethod.enum";
import { ApiQueryKey } from "../api/models/enpoint.model";
import { ApiStoreData } from "../redux/models/store.model";
import { apiActions } from "../redux/redux-api/api.actions";
import { AccamulatorType } from "../redux/redux-api/api.reducer";
import { apiStore } from "../redux/redux-api/api.selector";

export type FetchParam<U> = {
	[ApiMethodEnum.POST]: { data: U };
	[ApiMethodEnum.PUT]: { searchQuery: string; data: U };
	[ApiMethodEnum.DELETE]: { searchQuery: string };
	[ApiMethodEnum.GET]: { searchQuery?: string };
};

export function useFetch<T, K extends ApiMethodEnum>(
	endpoint: ApiQueryKey
): [AccamulatorType<T>, (payload: FetchParam<T>[K]) => void] {
	const dispatch = useDispatch();
	const apiState: ApiStoreData = useSelector(apiStore);

	const performFetch = useCallback(
		(payload: FetchParam<T>[K]) =>
			dispatch(apiActions<T, K>().fetchStart(endpoint, payload)),
		[dispatch, endpoint]
	);

	const response = useMemo(() => {
		return apiState[endpoint] as unknown as AccamulatorType<T>;
	}, [apiState, endpoint]);

	return [response, performFetch];
}
