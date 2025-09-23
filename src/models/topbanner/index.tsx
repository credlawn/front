import { getBannerSettings, getBannerMessages } from "@/get-api-data/topbanner"; // Updated import path
import TopBanner from "./topBanner";
import { BannerSettings } from "@/types/topbanner";

export default async function TopBannerContainer() { 
  const bannerSettings = await getBannerSettings(); 
  const bannerMessages = await getBannerMessages();

  const mappedSettings: BannerSettings = {
    showBanner: bannerSettings.show_top_banner ?? 1,
    url: bannerSettings.banner_url ?? "#",
    background: bannerSettings.bg_color ?? "black",
    boxShadowColor: bannerSettings.bg_shadow_color ?? "transparent",
    banAnimation: bannerSettings.banner_animation ?? "zoom",
    heightMobile: bannerSettings.mob_height ?? "h-8",
    heightDesktop: bannerSettings.lap_height ?? "h-9",
    fontWeightMobile: bannerSettings.mob_ft_weight ?? 500,
    fontWeightDesktop: bannerSettings.lap_ft_weight ?? 600,
    fontSizeMobile: bannerSettings.mob_ft_size ?? 14,
    fontSizeDesktop: bannerSettings.lap_ft_size ?? 16,
    fontColorMobile: bannerSettings.mob_font_color ?? "white",
    fontColorDesktop: bannerSettings.lap_font_color ?? "white",
  };

  if (mappedSettings.showBanner !== 1) {
    return null;
  }

  return <TopBanner {...mappedSettings} url={mappedSettings.url} messages={bannerMessages} />;
}
