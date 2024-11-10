import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
export const tokenizedAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const setupInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("!");
      const errorResponse = error.response;
      console.log(error);
      if (errorResponse && errorResponse.status < 500) {
        console.log("!!");
        if (errorResponse.data.message !== "Unauthrorizated") {
          console.log("!!!");
          toast.error(`Error: ${errorResponse.data.message}`);
        }
      }
      return Promise.reject(error);
    }
  );
};
setupInterceptor(axiosInstance);
setupInterceptor(tokenizedAxiosInstance);
tokenizedAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
