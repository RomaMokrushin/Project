import { Debt, DebtTotal } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class DebtorsService extends ApiService {
  static async getAllDebts() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_debters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as Debt[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
  static async getDebtsTotalData() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_lends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as DebtTotal, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default DebtorsService;
