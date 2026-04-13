import { cache } from "react";

import { isDatabaseConfigured, prisma } from "@/lib/prisma";
import {
  LEGACY_HOME_ABOUT_BLOCK_ID,
  SITE_CONTENT_BLOCK_ID,
  cloneDefaultSiteContent,
  siteContentSchema,
  type SiteContent,
} from "@/lib/site-content-schema";

function parseParagraphs(value: string) {
  return value
    .split(/\n\s*\n/g)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function applyLegacyHomeAbout(siteContent: SiteContent, legacyTitle: string | null, legacyContent: string) {
  const paragraphs = parseParagraphs(legacyContent);

  if (legacyTitle?.trim()) {
    siteContent.home.about.title = legacyTitle.trim();
  }

  if (paragraphs.length > 0) {
    siteContent.home.about.paragraphs = paragraphs;
  }
}

export function serializeSiteContent(siteContent: SiteContent) {
  return JSON.stringify(siteContent, null, 2);
}

export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const fallback = cloneDefaultSiteContent();

  if (!isDatabaseConfigured() || !prisma) {
    return fallback;
  }

  const [siteBlock, legacyHomeAbout] = await Promise.all([
    prisma.contentBlock.findUnique({
      where: { id: SITE_CONTENT_BLOCK_ID },
    }),
    prisma.contentBlock.findUnique({
      where: { id: LEGACY_HOME_ABOUT_BLOCK_ID },
    }),
  ]);

  if (siteBlock?.content) {
    try {
      const parsed = siteContentSchema.safeParse(JSON.parse(siteBlock.content));
      if (parsed.success) {
        return parsed.data;
      }
    } catch {
      // Fall through to defaults when persisted content is invalid JSON.
    }
  }

  if (legacyHomeAbout?.content) {
    applyLegacyHomeAbout(fallback, legacyHomeAbout.title, legacyHomeAbout.content);
  }

  return fallback;
});