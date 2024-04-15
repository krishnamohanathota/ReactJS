// Define types for API endpoints
interface ApiEndpoints {
  LOGIN: string;
  PROFILE: string;
  REFRESH_TOKEN: string;
  LOGOUT: string;
  USERS: string;
  ORDERS: string;
  PAYMENTS: string;
}

// Define default values for environment variables if not set
export const { API_BASE_URL = "https://example.com/api" } = process.env;

// Export necessary constants
export const LOGIN_SUCCESS: string = "LOGIN_SUCCESS";
export const LOGOUT: string = "LOGOUT";
export const EXPIRED_TOKEN_ERROR_CODE: number = 401;
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const API_ENDPOINTS: ApiEndpoints = {
  LOGIN: "/api/v1/auth/login",
  PROFILE: "/api/v1/auth/profile",
  REFRESH_TOKEN: "/api/v1/auth/refresh-token",
  LOGOUT: "/logout",
  USERS: "/users",
  ORDERS: "/orders",
  PAYMENTS: "/payments",
};

export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};
