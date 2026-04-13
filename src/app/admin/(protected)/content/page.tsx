import SiteContentEditor from "../../content/SiteContentEditor";

import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const siteContent = await getSiteContent();

  return (
    <div className="max-w-6xl space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-bold text-white">Site Content</h1>
        <p className="max-w-2xl font-light leading-relaxed text-neutral-400">
          Update the shared site payload from one place. Navbar, footer, homepage,
          brands, contact, careers, and events all render from this editor.
        </p>
      </div>

      <SiteContentEditor initialContent={siteContent} />
    </div>
  );
}