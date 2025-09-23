import { api } from "@/lib/fetch";
import { MenuResponse } from "@/types/menu";
import { unstable_cache } from "next/cache";

export const getMenuList = unstable_cache(
  async (): Promise<MenuResponse[]> => {
    try {
      const response = await api("menu_list.get_menu_list");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch menu list');
      }

      const data = await response.json();
      return data.message?.menu || [];
    } catch (error) {
      console.error("Error fetching menu list:", error);
      throw error;
    }
  },
  ["navbar-data"],
  { tags: ['navbar-data'] }
);