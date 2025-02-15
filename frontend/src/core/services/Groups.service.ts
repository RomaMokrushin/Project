import type { Group, GroupLog, Trip } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class GroupsService extends ApiService {
  static async getMyGroups() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/user/my_groups_participate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getAssociates() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/group/homies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getGroupById(id: string) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      return { data: response as Group, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getAllGroups() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/group/all_groups`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async createGroup({
    name,
    description,
    is_private,
    is_closed,
  }: {
    name: string;
    description: string;
    is_private: number;
    is_closed: number;
  }) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const body = {
        name,
        description,
        is_private,
        is_closed,
      };
      const response = await fetch(`${baseUrl}/group/new_group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getGroupLogs(id: string) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/log/group/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: [`group-${id}-logs`],
          revalidate: 60,
        },
      }).then((res) => res.json());
      return { data: response as GroupLog[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getTripReviews(group_id: string) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/trip/get_trips_short/${group_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return { data: response, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async getReportById(report_id: string) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/trip/get_trip_full/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
      return { data: response as Trip, error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default GroupsService;
