export interface HeroItem {
  hero_title: string;
  hero_subtitle: string;
  price_text: string;
  price: string;
  hero_image: string;
  image_alt: string;
  hero_url: string;
  button_text: string;
}

export interface HeroSettings {
  autoSlide?: boolean;
  priColor?: string;
  secColor?: string;
  thiColor?: string;
  btn1Color?: string;
  btn2Color?: string;
  bt1Color?: string;
  bt2Color?: string;
  currency?: string;
}

export interface HeroProps {
  heroData: HeroItem[];
  settings: HeroSettings;
}