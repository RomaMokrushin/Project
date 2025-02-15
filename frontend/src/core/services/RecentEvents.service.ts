import { RecentEvent } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class RecentEventsService extends ApiService {
  static async getAllRecentEvents() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/trip/get_my_trips_short`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as RecentEvent[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default RecentEventsService;
