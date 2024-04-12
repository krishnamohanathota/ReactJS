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
  private refreshToken?: string;
  private refreshTokenSupported: boolean; // Flag to check refreshToken support

  // Constructor to initialize the base URL
  constructor(baseUrl: string, refreshTokenSupported: boolean = false) {
    this.baseUrl = baseUrl;
    this.refreshTokenSupported = refreshTokenSupported;
  }

  // Setter method for setting the access token
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  // Setter method for setting the refresh token
  setRefreshToken(token: string) {
    this.refreshToken = token;
    this.refreshTokenSupported = true;
  }

  // Private method to retrieve the access token
  private async getAccessToken(): Promise<string> {
    if (
      !this.refreshTokenSupported ||
      !this.refreshToken ||
      !this.accessToken
    ) {
      throw new Error(
        "Access token not available or refreshToken not supported"
      );
    }

    try {
      const refreshTokenResponse = await axios.post<{ accessToken: string }>(
        `${this.baseUrl}/refresh-token`,
        { refreshToken: this.refreshToken }
      );
      this.accessToken = refreshTokenResponse.data.accessToken;
      return this.accessToken;
    } catch (error) {
      Logger.error("Error refreshing access token", error as Error);
      throw new Error("Failed to refresh access token");
    }
  }

  // Private method to handle unauthorized requests by refreshing the access token
  private async handleUnauthorized(
    config: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    try {
      if (!this.accessToken) {
        await this.getAccessToken();
      }
    } catch (error) {
      Logger.error("Failed to obtain access token", error as Error);
    }

    // Ensure headers exist, even if empty
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${this.accessToken}`;

    return config;
  }

  // Private method to make HTTP requests with proper authorization handling
  private async request<T>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: any,
    params?: Record<string, string | string[]>,
    retryCount: number = 0, // Initialize retry count
    loginRequest: boolean = false
  ): Promise<ApiResponse<T>> {
    const MAX_RETRY_COUNT = 3; // Maximum number of retry attempts

    const config: AxiosRequestConfig = {
      method,
      baseURL: this.baseUrl,
      url,
      data,
      params,
      headers: defaultHeaders,
    };

    try {
      if (!loginRequest) {
        const updatedConfig: AxiosRequestConfig = await this.handleUnauthorized(
          config
        );

        const response = await axios.request<T>(updatedConfig);
        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        };
      } else {
        const response = await axios.request<T>(config);

        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText,
        };
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          // Check for specific error code for expired access tokens
          if (
            error.response.data.errorCode ===
              process.env.EXPIRED_TOKEN_ERROR_CODE &&
            this.refreshTokenSupported &&
            retryCount < MAX_RETRY_COUNT // Check if retry count is within limit
          ) {
            try {
              // Attempt to refresh token
              await this.getAccessToken();
              // Increment retry count and retry the original request
              return await this.request<T>(
                method,
                url,
                data,
                params,
                retryCount + 1
              );
            } catch (refreshError) {
              Logger.error("Error refreshing token", refreshError as Error);
            }
          }
          throw new Error("Unauthorized");
        } else {
          Logger.error("API request error:", error as Error);
        }
      } else {
        // Handle other errors (e.g., network errors)
        Logger.error("API request error (no response):", error as Error);
      }
      throw error;
    } finally {
      // Perform any cleanup actions (e.g., logging)
    }
  }

  // Method for logging in and obtaining access tokens
  async login<T>(url: string, data: any): Promise<ApiResponse<T>> {
    return await this.request<T>("post", url, data, undefined, 0, true);
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
