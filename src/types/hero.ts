import { SiteSettings } from "./settings";

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

export interface HeroProps {
  heroData: HeroItem[];
  settings: SiteSettings;
}