import { takeEvery, put, all } from "redux-saga/effects";
import { apiActions, API_ACTIONS } from "../redux-api/api.actions";
import { apiHelper } from "../../helpers/api.helper";
import { ActionTypeApi } from "../models/action.type";
import { camelCase } from "lodash";
import { ApiQueryKey } from "../../api/models/enpoint.model";
import { ApiMethodEnum } from "../../api/models/apiMethod.enum";

export function* onApiLoad(action: any) {
	const { type, payload } = action as ActionTypeApi<object, ApiMethodEnum>;

	const actionType = camelCase(
		type.replace(API_ACTIONS.FETCH_START, "")
	) as ApiQueryKey;

	try {
		const data: Promise<object> = yield apiHelper<object, ApiMethodEnum>(
			actionType,
			payload
		);
		yield put(apiActions().fetchSuccess(actionType, data));
	} catch (e) {
		yield put(apiActions().fetchFailure(actionType, e));
	}
}

export function* watchApiLoad() {
	yield takeEvery(
		(action: any) => action.type.startsWith(API_ACTIONS.FETCH_START),
		onApiLoad
	);
}

export default function* rootSaga() {
	yield all([watchApiLoad()]);
}
