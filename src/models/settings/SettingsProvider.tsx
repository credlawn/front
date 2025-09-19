'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SiteSettingsResponse } from './settings';

export interface MappedSettings {
  showBanner: number;
  visitorTracking: number;
  currency: string;
  showMobileLogo: number;
  autoSlideHero: number;
  url?: string;
  logo_url?: string;
  cardSize?: number;
  mobileCardSize?: number;
  tabCardSize?: number;
  imageSize?: number;
  mobileImageSize?: number;
  tabImageSize?: number;
  cardBg?: string;
  imageBg?: string;
  textColor?: string;
  priColor?: string;
  secColor?: string;
  thiColor?: string;
  btn1Color?: string;
  btn2Color?: string;
  btn3Color?: string;
  bt1Color?: string;
  bt2Color?: string;
  bt3Color?: string;
  starColorPage?: string;
  starColorCard?: string;
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
  bannerMessages?: string[];
}

const SettingsContext = createContext<MappedSettings | null>(null);

export function SettingsProvider({
  children,
  settings,
  bannerMessages,
}: {
  children: ReactNode;
  settings: SiteSettingsResponse | null;
  bannerMessages?: string[];
}) {
  if (!settings) {
    settings = {} as SiteSettingsResponse;
  }

  const mappedSettings: MappedSettings = {
    showBanner: settings.show_top_banner ?? 1,
    visitorTracking: settings.visitor_tracking ?? 0,
    currency: settings.currency ?? '₹',
    showMobileLogo: settings.show_mobile_logo ?? 1,
    autoSlideHero: settings.auto_slide_hero ?? 1,
    url: settings.banner_url ?? '#',
    logo_url: settings.logo_url ?? '',
    cardSize: settings.card_size ?? 72,
    mobileCardSize: settings.mobile_card_size ?? 72,
    tabCardSize: settings.tab_card_size ?? 72,
    imageSize: settings.image_size ?? 56,
    mobileImageSize: settings.mobile_image_size ?? 56,
    tabImageSize: settings.tab_image_size ?? 56,
    cardBg: settings.card_bg ?? 'white',
    imageBg: settings.image_bg ?? 'transparent',
    textColor: settings.text_color ?? 'black',
    priColor: settings.primary_color ?? 'red-500',
    secColor: settings.secondary_color ?? 'natural-900',
    thiColor: settings.third_color ?? 'red-500',
    btn1Color: settings.button_1_color ?? 'red-500',
    btn2Color: settings.button_2_color ?? 'green-600',
    btn3Color: settings.button_3_color ?? 'blue-500',
    bt1Color: settings.bt_1_color ?? 'natural-900',
    bt2Color: settings.bt_2_color ?? 'white',
    bt3Color: settings.bt_3_color ?? 'blue',
    starColorPage: settings.star_color_2 ?? '#f51818',
    starColorCard: settings.star_color_1 ?? '#f51818',
    background: settings.bg_color ?? 'black',
    boxShadowColor: settings.bg_shadow_color ?? 'transparent',
    banAnimation: settings.banner_animation ?? 'zoom',
    heightMobile: settings.mob_height ?? 'h-8',
    heightDesktop: settings.lap_height ?? 'h-9',
    fontWeightMobile: settings.mob_ft_weight ?? 500,
    fontWeightDesktop: settings.lap_ft_weight ?? 600,
    fontSizeMobile: settings.mob_ft_size ?? 14,
    fontSizeDesktop: settings.lap_ft_size ?? 16,
    fontColorMobile: settings.mob_font_color ?? 'white',
    fontColorDesktop: settings.lap_font_color ?? 'white',
    bannerMessages: bannerMessages ?? [],
  };

  return (
    <SettingsContext.Provider value={mappedSettings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
