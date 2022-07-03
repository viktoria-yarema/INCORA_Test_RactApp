import axios from "axios";
import { Config } from "./config";

const api = axios.create({
	withCredentials: true,
	baseURL: Config().BaseUrl,
});

export default api;
