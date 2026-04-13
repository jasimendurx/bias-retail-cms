import EventsPageClient from "./EventsPageClient";

import { getSiteContent } from "@/lib/site-content";

export default async function EventsPage() {
  const siteContent = await getSiteContent();

  return <EventsPageClient content={siteContent.events} />;
}
