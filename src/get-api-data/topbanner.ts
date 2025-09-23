import axiosInstance from "@/lib/axios";
import { BannerMessage } from "@/types/topbanner";
import { unstable_cache } from "next/cache";

export const getBannerMessages = unstable_cache(
  async (): Promise<string[]> => {
    try {
      const response = await axiosInstance.get("/api/method/myecom.api.banner_message.get_banner_message");
      const messagesArray: BannerMessage[] = response.data?.message?.messages || [];
      return messagesArray
        .map((msg) => msg.banner_message)
        .filter((msg) => msg && msg.trim() !== "");
    } catch {
      return [];
    }
  },
  ["banner-messages"],
  { tags: ['banner-messages'] }
);

export const getBannerSettings = unstable_cache(
  async () => {
    try {
      const response = await axiosInstance.get("/api/method/myecom.api.banner_message.get_banner_settings");
      return response.data?.message || {};
    } catch {
      return {};
    }
  },
  ["banner-settings"],
  { tags: ['site-settings'] }
);
