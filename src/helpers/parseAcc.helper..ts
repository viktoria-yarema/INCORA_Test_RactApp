import { AccamulatorType } from "../redux/redux-api/api.reducer";

export const parseAcc = <U>(
	acc: AccamulatorType<U>
): [typeof acc.data, typeof acc.loading, typeof acc.error] => {
	const { data, loading, error } = acc;

	return [data, loading, error];
};
