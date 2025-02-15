import type { Invite, PersonalInviteSent } from "../types";
import ApiService from "./Api.service";
import CookiesService from "./Cookies.service";

class InvitesService extends ApiService {
  static async getGroupInvitesSent({ id }: { id: string }) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/invite/group_invites_sent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
          next: {
            tags: ["invites-sent"],
          },
        }
      ).then((res) => res.json());
      return { data: response as Invite[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
  static async getGroupInvitesReceived({ id }: { id: string }) {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(
        `${baseUrl}/invite/group_invites_got/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-cache",
          next: {
            tags: ["invites-received"],
          },
        }
      ).then((res) => res.json());
      return { data: response as Invite[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }

  static async personalInvitesSent() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/invite/my_invites_sent`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
          tags: ["invites-received"],
        },
      }).then((res) => res.json());
      return { data: response as PersonalInviteSent[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
  static async personalInvitesRecieved() {
    const baseUrl = ApiService.getBaseUrl();
    try {
      const token = await CookiesService.getCookie("access_token");
      const response = await fetch(`${baseUrl}/invite/my_invites_got`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-cache",
        next: {
          tags: ["invites-received"],
        },
      }).then((res) => res.json());
      return { data: response as PersonalInviteSent[], error: undefined };
    } catch (error) {
      return { data: undefined, error };
    }
  }
}

export default InvitesService;
