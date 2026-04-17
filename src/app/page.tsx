import HomePageClient from "./HomePageClient";

import { getSiteContent } from "@/lib/site-content";

export default async function Home() {
  const siteContent = await getSiteContent();

  return <HomePageClient content={siteContent.home} />;
}
