import { ActionType, ActionTypeApi } from "../models/action.type";
import { API_ACTIONS } from "./api.actions";
import { ENDPOINT } from "../../api/api";
import { camelCase } from "lodash";
import { User } from "../../entities/user.entities";
import { Post } from "../../entities/post.entities";
import { ApiStoreData } from "../models/store.model";
import { ApiQueryKey } from "../../api/models/enpoint.model";

export type AccamulatorType<T> = {
	data: T | null;
	loading: boolean;
	error: null | any;
};

const initialState = (): ApiStoreData<User | Post> => {
	const buildedAcc = Object.keys(ENDPOINT).reduce(
		(acc: ApiStoreData<User | Post> | {}, next: string) => {
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
		},
		{}
	);

	return buildedAcc as ApiStoreData<User | Post>;
};

const INITIAL_STATE: ApiStoreData<User | Post> = initialState();

const onParseKey = (type: ActionType, api: string): ApiQueryKey => {
	return camelCase(type.replaceAll(`${api}`, "")) as ApiQueryKey;
};

export const apiReducer = (
	state = INITIAL_STATE,
	action: ActionTypeApi<User | Post, any>
) => {
	if (action.type.startsWith(API_ACTIONS.FETCH_START)) {
		const inner: ApiQueryKey = onParseKey(action.type, API_ACTIONS.FETCH_START);

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
