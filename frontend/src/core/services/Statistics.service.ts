import type { FinancialSummary } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class StatisticsService extends ApiService {
  static async getMyStatistics() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_statistic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
          tags: ["statistics"],
        },
      }).then((res) => res.json());
      return { data: response as FinancialSummary, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default StatisticsService;
