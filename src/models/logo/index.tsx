import { getSiteSettings } from "@/models/settings/settingsApi";
import { Logo } from "./logo";

export default async function LogoServer() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logo_url;

  return <Logo logoUrl={logoUrl} />;
}
