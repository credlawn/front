import { getSiteSettings } from "@/models/settings/settings";
import { Logo } from "./logo";

export default async function LogoServer() {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logo_url;

  return <Logo logoUrl={logoUrl} />;
}
