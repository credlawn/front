import axiosInstance from "@/lib/axios";


export async function getSiteSettings() {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.site_settings.get_site_settings");
    return response.data?.message || {};

    
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return {};
  }
}
