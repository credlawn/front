import { getHeroDetails, getHeroSettings } from "@/get-api-data/hero";
import Hero from "./hero";

export default async function HeroContainer() {
  const [heroData, heroSettings] = await Promise.all([
    getHeroDetails(),
    getHeroSettings(),
  ]);

  return (
    <Hero
      heroData={heroData}
      settings={heroSettings}
    />
  );
}
