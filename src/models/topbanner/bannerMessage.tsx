import axiosInstance from "@/lib/axios";

export interface BannerMessage {
  banner_message: string;
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
