import axiosInstance from "@/lib/axios";
import { HeroItem, HeroSettings } from "@/types/hero";
import { unstable_cache } from "next/cache";

export const getHeroDetails = unstable_cache(
  async (): Promise<HeroItem[]> => {
    try {
      const { data } = await axiosInstance.get(
        "/api/method/myecom.api.hero_section.get_hero_details"
      );

      return (data.message?.messages || []).map((item: HeroItem) => ({
        ...item,
        hero_image: item.hero_image,
        hero_url: item.hero_url,
      }));
    } catch (error) {
      console.error("Error fetching hero details:", error);
      return [];
    }
  },
  ['hero-details'],
  { tags: ['hero-data'] }
);


export const getHeroSettings = unstable_cache(
  async (): Promise<HeroSettings> => {
    try {
      const response = await axiosInstance.get("/api/method/myecom.api.hero_section.get_hero_settings");
      return response.data?.message || {};
    } catch {
      return {};
    }
  },
  ['hero-settings'],
  { tags: ['hero-data'] }
);

