import { ApiQueryKey } from "../../api/models/enpoint.model";
import { Post } from "../../entities/post.entities";
import { User } from "../../entities/user.entities";
import { AccamulatorType } from "../redux-api/api.reducer";


export type StoreTypes = User | Post | User[] | Post[];

export type ApiStoreData<Type> = {
	[x in ApiQueryKey]: AccamulatorType<Type>;
};

export type StoreType<V = StoreTypes> = {
	api: ApiStoreData<V>;

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
