import { Credit, CreditTotal } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class CreditorsService extends ApiService {
  static async getAllCredits() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_lenders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as Credit[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
  static async getCreditorsTotalData() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_debts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
      }).then((res) => res.json());
      return { data: response as CreditTotal, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default CreditorsService;
