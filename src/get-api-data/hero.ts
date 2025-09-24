import { api } from "@/lib/fetch";
import { HeroItem, HeroSettings } from "@/types/hero";
import { unstable_cache } from "next/cache";

export const getHeroDetails = unstable_cache(
  async (): Promise<HeroItem[]> => {
    try {
      const response = await api("hero_section.get_hero_details", {
        next: { revalidate: 0, tags: ['hero-data'] }, 
      });

      if (!response.ok) throw new Error("Failed to fetch hero details");

      const data = await response.json();
      const messages: HeroItem[] = data.message?.messages || [];

      return messages.map((item: HeroItem) => ({
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
      const response = await api("hero_section.get_hero_settings", {
        next: { revalidate: 0, tags: ['hero-settings'] }, 

      });

      if (!response.ok) throw new Error("Failed to fetch hero settings");

      const data = await response.json();
      return data?.message || {};
    } catch (error) {
      console.error("Error fetching hero settings:", error);
      return {} as HeroSettings;
    }
  },
  ['hero-settings'],
  { tags: ['hero-settings'] }
);