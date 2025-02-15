import type { MyGroup, User } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class UserService extends ApiService {
  static async getMe() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as User, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getUser(id: string) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getMyGroups() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_groups_participate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as MyGroup[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getAllUsers() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/all_users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default UserService;
