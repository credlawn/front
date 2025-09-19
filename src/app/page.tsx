'use client';

import { useSettings } from "@/models/settings/SettingsProvider";
import TopBanner from "@/models/topbanner/topBanner";

export default function Page() {
  const settings = useSettings();

  return (
    <div>
      {settings.showBanner === 1 && (
        <TopBanner
          {...settings}
          href={settings.url}
          messages={settings.bannerMessages}
        />
      )}

    </div>
  );
}
