import { UserEnum } from "../../api/endpoints/user.api";
import { User } from "../../entities/user.entities";
import { AccamulatorType } from "../redux-api/api.reducer";

export interface ApiStoreData {
	[UserEnum.GetUsers]: AccamulatorType<User[]>;
}

export type StoreType = {
	api: ApiStoreData;

	router: {
		action: string;
		previousLocations: string;
		location: {
			pathname: string;
			search: string;
			hash: string;
			state: null | {};
			key: string;
		};
	};
};
