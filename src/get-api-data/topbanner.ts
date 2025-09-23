import { api } from "@/lib/fetch";
import { BannerMessage } from "@/types/topbanner";
import { unstable_cache } from "next/cache";

export const getBannerMessages = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const response = await api("banner_message.get_banner_message");

      if (!response.ok) throw new Error("Failed to fetch banner messages");

      const data = await response.json();
      const messagesArray: BannerMessage[] = data?.message?.messages || [];

      return messagesArray
        .map((msg) => msg.banner_message)
        .filter((msg) => msg && msg.trim() !== "");
    } catch (error) {
      console.error("getBannerMessages failed:", error);
      return [];
    }
  },
  ["banner-messages"],
  { tags: ['banner-messages'] }
);

export const getBannerSettings = unstable_cache(
  async () => {
    try {
      const response = await api("banner_message.get_banner_settings");

      if (!response.ok) throw new Error("Failed to fetch banner settings");

      const data = await response.json();
      return data?.message || {};
    } catch (error) {
      console.error("getBannerSettings failed:", error);
      return {};
    }
  },
  ["banner-settings"],
  { tags: ['site-settings'] }
);