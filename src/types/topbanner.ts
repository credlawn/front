export interface BannerMessage {
  banner_message: string;
}


export interface BannerSettings {
  showBanner: number;
  url: string;
  background: string;
  boxShadowColor: string;
  banAnimation: string;
  heightMobile: string;
  heightDesktop: string;
  fontWeightMobile: number;
  fontWeightDesktop: number;
  fontSizeMobile: number;
  fontSizeDesktop: number;
  fontColorMobile: string;
  fontColorDesktop: string;
}

export interface TopBannerProps extends BannerSettings {
  messages?: string[];
}