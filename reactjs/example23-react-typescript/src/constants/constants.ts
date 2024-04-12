export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

// Test Fake API : https://fakeapi.platzi.com/en/rest/auth-jwt/
export const API_BASE_URL = process.env.API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: "/api/v1/auth/login",
  LOGOUT: "/logout",
  USERS: "/users",
  ORDERS: "/orders",
  PAYMENTS: "/payments",
};

export const LOCAL_STORAGE_ACCESS_TOKEN = "ACCESS_TOKEN";
export const LOCAL_STORAGE_REFRESH_TOKEN = "REFRESH_TOKEN";
