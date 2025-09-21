import axiosInstance from "@/lib/axios";
import axios from "axios";

export interface HeroItem {
  hero_title: string;
  hero_subtitle: string;
  price_text: string;
  price: string;
  hero_image: string;
  image_alt: string;
  hero_url: string;
  button_text: string;
}

export interface HeroSettings {
  autoSlide?: boolean;
  priColor?: string;
  secColor?: string;
  thiColor?: string;
  btn1Color?: string;
  btn2Color?: string;
  bt1Color?: string;
  bt2Color?: string;
  currency?: string;
}

export async function getHeroDetails(): Promise<HeroItem[]> {
  try {
    const { data } = await axiosInstance.get(
      "/api/method/myecom.api.hero_section.get_hero_details"
    );

    return (data.message?.messages || []).map((item: HeroItem) => ({
      ...item,
      hero_image: item.hero_image ? item.hero_image : "files/placeholder.jpg",
      hero_url: item.hero_url ? item.hero_url : "#",
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to fetch hero details");
    }
    throw error;
  }
}

export async function getHeroSettings() {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.hero_section.get_hero_settings");
    return response.data?.message || {};
  } catch {
    return {};
  }
}

