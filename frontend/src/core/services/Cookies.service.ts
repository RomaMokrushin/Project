import { cookies } from "next/headers";

class CookiesService {
  static async getCookie(name: string) {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  }

  static async setCookie(name: string, value: string) {
    const cookieStore = await cookies();
    cookieStore.set(name, value);
  }

  static async deleteCookie(name: string) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
  }
}

export default CookiesService;
