import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MappedSettings, SiteSettingsResponse } from "@/types/settings";

const initialState: MappedSettings = {
  visitorTracking: 0,
  currency: '₹',
  showMobileLogo: 1,
  autoSlideHero: 1,
  logo_url: '',
  cardSize: 72,
  mobileCardSize: 72,
  tabCardSize: 72,
  imageSize: 56,
  mobileImageSize: 56,
  tabImageSize: 56,
  cardBg: 'white',
  imageBg: 'transparent',
  textColor: 'black',
  priColor: 'red-500',
  secColor: 'natural-900',
  thiColor: 'red-500',
  btn1Color: 'red-500',
  btn2Color: 'green-600',
  btn3Color: 'blue-500',
  bt1Color: 'natural-900',
  bt2Color: 'white',
  bt3Color: 'blue',
  starColorPage: '#f51818',
  starColorCard: '#f51818',
};


export const mapSettings = (settings: SiteSettingsResponse): MappedSettings => ({
  visitorTracking: settings.visitor_tracking ?? 0,
  currency: settings.currency ?? '₹',
  showMobileLogo: settings.show_mobile_logo ?? 1,
  autoSlideHero: settings.auto_slide_hero ?? 1,
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
});

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SiteSettingsResponse>) => {
      const mappedSettings = mapSettings(action.payload);
      Object.assign(state, mappedSettings);
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
