import { camelCase } from "lodash";
import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { apiActions } from "../redux/redux-api/api.actions";
import { AccamulatorType } from "../redux/redux-api/api.reducer";

export function useFetch<T>(endpoint: string) {
  const dispatch = useDispatch();
  const apiState: Record<string, AccamulatorType<T>> = useSelector(
    (state: Record<string, any>): Record<string, AccamulatorType<T>> =>
      state.api
  );

  const performFetch = useCallback(
    () => dispatch(apiActions<T>().fetchStart(endpoint)),
    [dispatch, endpoint]
  );

  const response = useMemo(() => {
    return apiState[camelCase(endpoint)];
  }, [apiState, endpoint]);

  return { response, performFetch };
}
