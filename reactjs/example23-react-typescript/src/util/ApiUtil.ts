import axios, { AxiosRequestConfig } from "axios";
import { Logger } from "./Logger";

const defaultHeaders = {
  "Content-Type": "application/json",
};

// Interface for API response
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// API Utility class
class ApiUtil {
  private baseUrl: string;
  private accessToken?: string;

  // Constructor to initialize the base URL
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Setter method for setting the access token
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Private method to make HTTP requests with proper authorization handling
  private async request<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any,
    params?: Record<string, string | string[]>
  ): Promise<ApiResponse<T>> {
    let config: AxiosRequestConfig = {
      method,
      baseURL: this.baseUrl,
      url,
      data,
      params,
      headers: {
        ...defaultHeaders,
        ...(this.accessToken
          ? { Authorization: `Bearer ${this.accessToken}` }
          : {}),
      },
    };

    try {
      const response = await axios.request<T>(config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      Logger.error("API error:", error as Error);
      throw error;
    }
  }

  // Method for logging in and obtaining access tokens
  async login<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return await this.request<T>("post", url, data, undefined);
  }

  // Method for logging out and removing tokens from storage
  async logout(url: string) {
    // Optionally, call an external logout API
    const payload = {};
    this.post(url, payload);
  }

  // Method for making HTTP GET requests
  async get<T>(
    url: string,
    params?: Record<string, string | string[]>
  ): Promise<ApiResponse<T>> {
    return await this.request<T>("get", url, undefined, params);
  }

  // Method for making HTTP POST requests
  async post<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return await this.request<T>("post", url, data, undefined);
  }

  // Method for making HTTP PUT requests
  async put<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return await this.request<T>("put", url, data, undefined);
  }

  // Method for making HTTP DELETE requests
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return await this.request<T>("delete", url, undefined, undefined);
  }
}

export default ApiUtil;
