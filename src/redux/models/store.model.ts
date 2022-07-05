import { ApiQueryKey } from "../../api/models/enpoint.model";
import { PostModel } from "../../entities/post.entities";
import { UserModel } from "../../entities/user.entities";
import { AccamulatorType } from "../redux-api/api.reducer";


export type StoreTypes = UserModel | PostModel | UserModel[] | PostModel[];

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
