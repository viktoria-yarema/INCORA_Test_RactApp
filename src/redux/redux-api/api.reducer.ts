import { ActionTypeApi } from "../models/action.type";
import { API_ACTIONS } from "./api.actions";
import { ENDPOINT } from "../../api/api";
import { camelCase } from "lodash";

export type AccamulatorType<T> = {
	data: null | T[] | boolean | T;
	loading: boolean;
	error: null | boolean;
};

const initialState = () => {
	return Object.keys(ENDPOINT).reduce((acc: any, next: string) => {
		const normalizeKey = camelCase(next);

		const inner = {
			data: null,
			loading: false,
			error: null,
		};

		return {
			...acc,
			[normalizeKey]: {
				...inner,
			},
		};
	}, {});
};

const INITIAL_STATE = initialState();

const onParseKey = (type: string, api: string) => {
	return camelCase(type.replaceAll(`${api}`, ""));
};

export const apiReducer = (state = INITIAL_STATE, action: ActionTypeApi<any, any>) => {
	if (action.type.startsWith(API_ACTIONS.FETCH_START)) {
		const inner = onParseKey(action.type, API_ACTIONS.FETCH_START);

		return {
			...state,
			[inner]: {
				...state[inner],
				loading: true,
				error: null,
			},
		};
	} else if (action.type.startsWith(API_ACTIONS.FETCH_SUCCESS)) {
		const innerSucces = onParseKey(action.type, API_ACTIONS.FETCH_SUCCESS);

		return {
			...state,
			[innerSucces]: {
				...state[innerSucces],
				data: action.payload,
				loading: false,
				error: null,
			},
		};
	} else if (action.type.startsWith(API_ACTIONS.FETCH_FAILD)) {
		const innerFailed = onParseKey(action.type, API_ACTIONS.FETCH_FAILD);

		return {
			...state,
			[innerFailed]: {
				...state[innerFailed],
				loading: false,
				error: action.payload,
			},
		};
	} else {
		return state;
	}
};
