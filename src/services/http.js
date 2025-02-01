import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();
export const defaultURL = "http://somtoval.pythonanywhere.com";
const baseURL = "http://somtoval.pythonanywhere.com/api";

// Utility function to handle errors
export const handleError = (error) => {
	if (axios.isCancel(error)) {
		console.log("Request canceled:", error.message);
	} else if (error.response) {
		// Server responded with a status other than 200 range
		console.error("Server error:", error.response.data || error.message);
		throw new Error(error.response.data?.message || "Server error occurred");
	} else {
		console.error("Network error:", error.message);
		throw new Error("Network error occurred", error.message);
	}
};

const apiClient = axios.create({
	baseURL,
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

export const fetchData = async (endpoint, options = {}) => {
	try {
		const response = await apiClient.get(endpoint, options);
		return response.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

export const postData = async (endpoint, data, options = {}) => {
	try {
		const response = await apiClient.post(endpoint, data, options);
		return response.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

export const deleteData = async (endpoint, data, options = {}) => {
	try {
		const response = await apiClient.delete(endpoint, {
			data,
			...options,
		});
		return response.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

export const putData = async (endpoint, data, options = {}) => {
	try {
		const response = await apiClient.put(endpoint, data, options);
		return response.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};
