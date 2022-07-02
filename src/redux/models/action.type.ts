export interface ActionType {
	type: string;
}



export type ApiPayloadType = Record<string, any> | null | T[] | T | boolean;

export interface ActionTypeApi extends ActionType {
	payload?: ApiPayloadType;
}
