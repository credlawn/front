import { getHeroDetails, getHeroSettings } from "./heroApi";
import Hero from "./hero";

export default async function HeroContainer() {
  const [heroData, heroSettings] = await Promise.all([
    getHeroDetails(),
    getHeroSettings(),
  ]);

  return (
    <Hero
      heroData={heroData}
      autoSlide={heroSettings.autoSlide}
      priColor={heroSettings.priColor}
      secColor={heroSettings.secColor}
      thiColor={heroSettings.thiColor}
      btn1Color={heroSettings.btn1Color}
      btn2Color={heroSettings.btn2Color}
      bt1Color={heroSettings.bt1Color}
      bt2Color={heroSettings.bt2Color}
      currency={heroSettings.currency}
    />
  );
}
