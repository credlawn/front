import axiosInstance from "@/lib/axios";
import axios from "axios";
import { MenuResponse } from "@/types/menu";
import { unstable_cache } from "next/cache";

export const getMenuList = unstable_cache(
  async (): Promise<MenuResponse[]> => {
    try {
      const response = await axiosInstance.get("/api/method/myecom.api.menu_list.get_menu_list");
      return response.data.message?.menu || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch menu list');
      }
      throw error;
    }
  },
  ["navbar-data"],
  { tags: ['navbar-data'] }
);