import ApiUtil, { ApiResponse } from "./ApiUtil";
import axios from "axios";

import {
  LOCAL_STORAGE_KEYS,
  API_ENDPOINTS,
  TOKEN_EXPIRED,
} from "./../constants/constants";
import { Logger } from "./Logger";
import LocalStorage from "./../util/LocalStorage";

// Define the type for the data returned from the login API
interface LoginResponseData {
  access_token: string;
  // Add other properties if there are any
}

class ApiService {
  private api: ApiUtil;

  constructor(baseUrl: string) {
    this.api = new ApiUtil(baseUrl);
  }

  // Clear Local Storage
  clearLocalStorage() {
    LocalStorage.remove(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  // Method to get access token from localStorage
  private getAccessToken(): string {
    return LocalStorage.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  }

  //Set accessToken and refreshToken
  private setAccessToken() {
    this.api.setAccessToken(this.getAccessToken());
  }

  // Method to handle login
  async login(username: string, password: string): Promise<LoginResponseData> {
    try {
      const response = await this.api.login(API_ENDPOINTS.LOGIN, {
        email: username,
        password,
      });
      const data = (await response.data) as LoginResponseData;
      const accessToken = data.access_token;

      //Store AccessToken in LocalStorage
      LocalStorage.store(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, accessToken);

      return data;
    } catch (error) {
      this.processError(error);
      throw error;
    }
  }

  // Method to handle logout
  async logout() {
    //Call Logout API
    await this.api.logout(API_ENDPOINTS.LOGOUT);
    this.clearLocalStorage();
  }

  async getUserProfile(): Promise<ApiResponse<any>> {
    try {
      this.setAccessToken();
      return await this.api.get(API_ENDPOINTS.PROFILE, undefined);
    } catch (error) {
      this.processError(error);
      throw error;
    }
  }

  // Method to process API Error
  private async processError(error: any): Promise<void> {
    if (axios.isAxiosError(error) && error.response) {
      const { statusText } = error.response;
      if (statusText === TOKEN_EXPIRED) {
        Logger.error("Token Expired....", error);
        //When Token is expired, clear the LocalStorage
        this.clearLocalStorage();
      } else {
        // Log and handle other API errors
        Logger.error("API Error:", error);
      }
    } else {
      // Log and handle other non-API errors
      Logger.error("Not an API error:", error as Error);
      // Handle other errors as needed
    }
  }
}

export default ApiService;
