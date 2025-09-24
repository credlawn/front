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
  auto_slide_hero?: boolean;
  primary_color?: string;
  secondary_color?: string;
  third_color?: string;
  button_1_color?: string;
  button_2_color?: string;
  bt_1_color?: string;
  bt_2_color?: string;
  currency?: string;
}

export interface HeroProps {
  heroData: HeroItem[];
  settings: HeroSettings;
}