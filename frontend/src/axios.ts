import { Axios } from "axios";
import { API_BASE_URL } from "./config";

export const axiosInstance = new Axios({
  baseURL: API_BASE_URL,
});

