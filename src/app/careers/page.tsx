import CareersPageClient from "./CareersPageClient";

import { getSiteContent } from "@/lib/site-content";

export default async function CareersPage() {
  const siteContent = await getSiteContent();

  return <CareersPageClient content={siteContent.careers} />;
}
