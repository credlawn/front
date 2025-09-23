import axiosInstance from "@/lib/axios";
import { unstable_cache } from "next/cache";

export const getSiteSettings = unstable_cache(
  async () => {
    try {
      const response = await axiosInstance.get("/api/method/myecom.api.site_settings.get_site_settings");
      return response.data?.message || {};
    } catch (error) {
      console.error("Error fetching site settings:", error);
      return {};
    }
  },
  ["site-settings"],
  { tags: ['site-settings'] }
);
