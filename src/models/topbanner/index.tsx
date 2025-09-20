import { getBannerSettings } from "@/models/topbanner/topBannerApi";
import { getBannerMessages } from "@/models/topbanner/topBannerApi";
import TopBanner from "@/models/topbanner/topBanner";


export default async function TopBannerPage() {
  const BS = await getBannerSettings();
  const bannerMessages = await getBannerMessages();

  const mappedSettings = {
    showBanner: BS.show_top_banner ?? 1,
    url: BS.banner_url ?? "#",
    background: BS.bg_color ?? "black",
    boxShadowColor: BS.bg_shadow_color ?? "transparent",
    banAnimation: BS.banner_animation ?? "zoom",
    heightMobile: BS.mob_height ?? "h-8",
    heightDesktop: BS.lap_height ?? "h-9",
    fontWeightMobile: BS.mob_ft_weight ?? 500,
    fontWeightDesktop: BS.lap_ft_weight ?? 600,
    fontSizeMobile: BS.mob_ft_size ?? 14,
    fontSizeDesktop: BS.lap_ft_size ?? 16,
    fontColorMobile: BS.mob_font_color ?? "white",
    fontColorDesktop: BS.lap_font_color ?? "white",
  };

  if (mappedSettings.showBanner !== 1) {
    return null;
  }

  return <TopBanner {...mappedSettings} href={mappedSettings.url} messages={bannerMessages} />;
}
