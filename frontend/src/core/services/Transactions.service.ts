import type { Transaction } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class TransactionsService extends ApiService {
  static async getAllTransactions() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/payments/my_payments
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
        }
      ).then((res) => res.json());
      return { data: response as Transaction[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getNumberOfUncheckedTransactions() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/payments/unchecked_payments`, {
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

export default TransactionsService;
