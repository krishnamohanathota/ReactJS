import ApiUtil, { ApiResponse } from "./ApiUtil";
import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
  API_ENDPOINTS,
} from "./../constants/constants";
import { Logger } from "./Logger";
import LocalStorage from "./../util/LocalStorage";

// Define the type for the data returned from the login API
interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  // Add other properties if there are any
}

class ApiService {
  private api: ApiUtil;

  constructor(baseUrl: string) {
    this.api = new ApiUtil(baseUrl);
  }

  // Method to handle login
  async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.api.login(API_ENDPOINTS.LOGIN, {
        email: username,
        password,
      });
      const data = (await response.data) as LoginResponseData;
      //console.log(data);
      const accessToken = data.access_token;
      const refreshToken = data.refresh_token;
      //console.log(accessToken);
      //console.log(refreshToken);
      LocalStorage.store(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
      LocalStorage.store(LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    } catch (error) {
      Logger.error("Login failed:", error as Error);
      this.clearLocalStorage();
      throw error;
    }
  }

  // Method to handle logout
  async logout() {
    //Call Logout API
    return await this.api.logout(API_ENDPOINTS.LOGOUT);
    this.clearLocalStorage();
  }

  // Method to handle logout
  clearLocalStorage() {
    //Call Logout API
    LocalStorage.remove(LOCAL_STORAGE_ACCESS_TOKEN);
    LocalStorage.remove(LOCAL_STORAGE_REFRESH_TOKEN);
  }

  // Method to get access token from localStorage
  getAccessToken(): string {
    return LocalStorage.get(LOCAL_STORAGE_ACCESS_TOKEN);
  }

  // Method to get refresh token from localStorage
  getRefreshToken(): string {
    return LocalStorage.get(LOCAL_STORAGE_REFRESH_TOKEN);
  }

  //Set accessToken and refreshToken
  setTokens() {
    this.api.setAccessToken(this.getAccessToken());
    const refreshToken = this.getRefreshToken();
    if (refreshToken) this.api.setRefreshToken(this.getRefreshToken());
  }

  // Method to get posts
  async getPosts(): Promise<ApiResponse<any>> {
    return await this.api.get("/posts", undefined);
  }

  // Method to update a post
  async updatePost(
    postId: number,
    updatedData: any
  ): Promise<ApiResponse<any>> {
    this.setTokens();
    return await this.api.put(`/posts/${postId}`, updatedData);
  }

  // Method to create a new post
  async createPost(newPostData: any): Promise<ApiResponse<any>> {
    this.setTokens();
    return await this.api.post("/posts", newPostData);
  }

  // Method to delete a post
  async deletePost(postId: number): Promise<ApiResponse<any>> {
    this.setTokens();
    return await this.api.delete(`/posts/${postId}`);
  }
}

export default ApiService;
