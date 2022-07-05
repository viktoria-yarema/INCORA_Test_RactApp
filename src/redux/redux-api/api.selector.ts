import { StoreType } from "../models/store.model";

export const apiStore = <T>(store: StoreType<T>) => store.api