import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();
export const defaultURL = "http://somtoval.pythonanywhere.com";
//192.168.0.199
//127.0.0.1
const baseURL = "http://192.168.0.199:3000/api/v1/";

// Utility function to handle errors
export const handleError = (error: any) => {
  if (axios.isCancel(error)) {
    console.log("Request canceled:", error.message);
  } else if (error.response) {
    // Server responded with a status other than 200 range
    console.error("Server error:", error.response.data || error.message);
    throw new Error(error.response.data?.message || "Server error occurred");
  } else {
    console.error("Network error:", error.message);
    throw new Error("Network error occurred");
  }
};

const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("authToken");
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error)
// );

export const fetchData = async <T>(
  endpoint: string,
  options: object = {}
): Promise<T> => {
  try {
    const response = await apiClient.get(endpoint, options);
    return response.data.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const postData = async <T>(
  endpoint: string,
  data: T,
  options = {}
): Promise<T> => {
  try {
    const response = await apiClient.post(endpoint, data, options);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const deleteData = async (endpoint: string, options: object = {}) => {
  try {
    const response = await apiClient.delete(endpoint, {
      ...options,
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const putData = async <T>(
  endpoint: string,
  data: T,
  options: object = {}
) => {
  try {
    const response = await apiClient.put(endpoint, data, options);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};
