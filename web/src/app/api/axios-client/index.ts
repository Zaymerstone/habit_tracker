// import axios, { AxiosInstance } from "axios";
// import { toast } from "react-toastify";

// export const axiosInstance: AxiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
// });
// export const tokenizedAxiosInstance: AxiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const setupInterceptor = (instance: AxiosInstance) => {
//   instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const errorResponse = error.response;
//       // Check if 'suppress-toast' header is set, skip the toast if true
//       if (
//         errorResponse &&
//         errorResponse.status < 500 &&
//         !error.config.headers["suppress-toast"]
//       ) {
//         if (errorResponse.data.message !== "Unauthrorizated") {
//           toast.error(`Error: ${errorResponse.data.message}`);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };
// setupInterceptor(axiosInstance);
// setupInterceptor(tokenizedAxiosInstance);
// tokenizedAxiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// CHATGPT BELOW

import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});
export const tokenizedAxiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const setupInterceptor = (instance: AxiosInstance) => {
  // A variable to track the last toast message

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorResponse = error.response;

      // Check if 'suppress-toast' header is set; skip the toast if true
      if (errorResponse && errorResponse.status < 500) {
        const currentToastMessage = errorResponse.data.message;

        // Prevent duplicate toasts by comparing messages
        if (currentToastMessage && currentToastMessage !== "Unauthorized") {
          toast.error(`Error: ${currentToastMessage}`);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Apply interceptor to both axios instances
setupInterceptor(axiosInstance);
setupInterceptor(tokenizedAxiosInstance);

// Add token to requests in tokenizedAxiosInstance
tokenizedAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
