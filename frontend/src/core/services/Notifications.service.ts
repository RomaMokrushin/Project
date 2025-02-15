import type { Notification } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class NotificationsService extends ApiService {
  static async getMyNotifications() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/message/my_messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
          tags: ["notifications"],
        },
      }).then((res) => res.json());
      return { data: response as Notification[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
  static async getNotificationUnread() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/message/amount_unread_messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
          next: {
            tags: ["statistics-number"],
          },
        }
      ).then((res) => res.json());
      return { data: response as number, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default NotificationsService;
