import axiosInstance from "@/lib/axios";

export interface BannerMessage {
  banner_message: string;
}

export interface BS {
    showBanner: number;
    url?: string;
    background?: string;
    boxShadowColor?: string;
    banAnimation?: string;
    heightMobile?: string;
    heightDesktop?: string;
    fontWeightMobile?: number;
    fontWeightDesktop?: number;
    fontSizeMobile?: number;
    fontSizeDesktop?: number;
    fontColorMobile?: string;
    fontColorDesktop?: string;
}

export async function getBannerMessages(): Promise<string[]> {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.banner_message.get_banner_message");
    const messagesArray: BannerMessage[] = response.data?.message?.messages || [];
    return messagesArray
      .map((msg) => msg.banner_message)
      .filter((msg) => msg && msg.trim() !== "");
  } catch {
    return [];
  }
}

export async function getBannerSettings() {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.banner_message.get_banner_settings");
    return response.data?.message || {};

    
  } catch {
    return {};
  }
}
