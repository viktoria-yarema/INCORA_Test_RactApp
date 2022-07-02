import { takeEvery, put, all } from "redux-saga/effects";
import { apiActions, API_ACTIONS } from "../redux-api/api.actions";
import { apiHelper } from "../../helpers/api.helper";
import { ActionType, ActionTypeApi } from "../models/action.type";
import { LOCATION_CHANGE } from "redux-first-history";

export function* onApiLoad(action: ActionTypeApi, dataConfig?: any) {
	const actionType = action.type
		.replace(API_ACTIONS.FETCH_START, "")
		.toLowerCase();
	try {
		const data: Promise<T> = yield apiHelper(actionType, dataConfig);
		yield put(apiActions.fetchSuccess(actionType, data));
	} catch (e) {
		yield put(apiActions.fetchFailure(actionType, e));
	}
}

export function* watchApiLoad() {
	yield takeEvery(
		(action: ActionTypeApi) => action.type.startsWith(API_ACTIONS.FETCH_START),
		onApiLoad
	);
}

export default function* rootSaga() {
	yield all([watchApiLoad()]);
}
