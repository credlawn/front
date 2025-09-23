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

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<SiteSettingsResponse>) => {
      const settings = action.payload;
      state.visitorTracking = settings.visitor_tracking ?? 0;
      state.currency = settings.currency ?? '₹';
      state.showMobileLogo = settings.show_mobile_logo ?? 1;
      state.autoSlideHero = settings.auto_slide_hero ?? 1;
      state.logo_url = settings.logo_url ?? '';
      state.cardSize = settings.card_size ?? 72;
      state.mobileCardSize = settings.mobile_card_size ?? 72;
      state.tabCardSize = settings.tab_card_size ?? 72;
      state.imageSize = settings.image_size ?? 56;
      state.mobileImageSize = settings.mobile_image_size ?? 56;
      state.tabImageSize = settings.tab_image_size ?? 56;
      state.cardBg = settings.card_bg ?? 'white';
      state.imageBg = settings.image_bg ?? 'transparent';
      state.textColor = settings.text_color ?? 'black';
      state.priColor = settings.primary_color ?? 'red-500';
      state.secColor = settings.secondary_color ?? 'natural-900';
      state.thiColor = settings.third_color ?? 'red-500';
      state.btn1Color = settings.button_1_color ?? 'red-500';
      state.btn2Color = settings.button_2_color ?? 'green-600';
      state.btn3Color = settings.button_3_color ?? 'blue-500';
      state.bt1Color = settings.bt_1_color ?? 'natural-900';
      state.bt2Color = settings.bt_2_color ?? 'white';
      state.bt3Color = settings.bt_3_color ?? 'blue';
      state.starColorPage = settings.star_color_2 ?? '#f51818';
      state.starColorCard = settings.star_color_1 ?? '#f51818';
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
