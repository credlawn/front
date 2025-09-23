import axiosInstance from "@/lib/axios";
import axios from "axios";
import { MenuResponse } from "@/types/menu";

export async function getMenuList(): Promise<MenuResponse[]> {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.menu_list.get_menu_list");
    return response.data.message?.menu || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch menu list');
    }
    throw error;
  }
}