import { ENDPOINT } from "../api/api";

export const apiHelper = async (endpoint: string, payload: any) => {
  return await ENDPOINT[endpoint.toUpperCase()];
};
  