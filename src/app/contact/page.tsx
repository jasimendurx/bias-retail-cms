import ContactPageClient from "./ContactPageClient";

import { getSiteContent } from "@/lib/site-content";

export default async function ContactPage() {
  const siteContent = await getSiteContent();

  return <ContactPageClient content={siteContent.contact} />;
}
