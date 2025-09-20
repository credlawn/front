import axiosInstance from "@/lib/axios";

export interface SiteSettingsResponse {
  show_top_banner: number;
  show_mobile_logo: number;
  visitor_tracking: number;
  auto_slide_hero: number;
  banner_url?: string | null;
  logo_url?: string | null;
  card_size?: number;
  mobile_card_size?: number;
  tab_card_size?: number;
  image_size?: number;
  mobile_image_size?: number;
  tab_image_size?: number;
  card_bg?: string | null;
  image_bg?: string | null;
  text_color?: string | null;
  currency?: string | null;
  primary_color?: string | null;
  secondary_color?: string | null;
  third_color?: string | null;
  button_1_color?: string | null;
  button_2_color?: string | null;
  button_3_color?: string | null;
  bt_1_color?: string | null;
  bt_2_color?: string | null;
  bt_3_color?: string | null;
  star_color_1?: string | null;
  star_color_2?: string | null;
  banner_animation?: string | null;
  bg_color?: string | null;
  bg_shadow_color?: string | null;
  mob_font_color?: string | null;
  lap_font_color?: string | null;
  mob_height?: string | null;
  lap_height?: string | null;
  mob_ft_weight?: number;
  lap_ft_weight?: number;
  mob_ft_size?: number;
  lap_ft_size?: number;
}


export async function getSiteSettings() {
  try {
    const response = await axiosInstance.get("/api/method/myecom.api.site_settings.get_site_settings");
    return response.data?.message || {};

    
  } catch {
    return {};
  }
}
