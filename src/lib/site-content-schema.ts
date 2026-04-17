import defaultSiteContentData from "@/lib/default-site-content";
import { z } from "zod";

export const SITE_CONTENT_BLOCK_ID = "site-content";
export const LEGACY_HOME_ABOUT_BLOCK_ID = "home-about";

const requiredText = (label: string, max = 5000) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const linkSchema = z.object({
  label: requiredText("Link label", 80),
  href: requiredText("Link href", 500),
});

const heroSchema = z.object({
  eyebrow: requiredText("Hero eyebrow", 120),
  titleLineOne: requiredText("Hero title line one", 160),
  titleLineTwo: requiredText("Hero title line two", 160),
  description: requiredText("Hero description", 1200),
});

const statSchema = z.object({
  value: requiredText("Stat value", 40),
  label: requiredText("Stat label", 120),
});

const titledDescriptionSchema = z.object({
  title: requiredText("Title", 120),
  description: requiredText("Description", 800),
});

const jobSchema = z.object({
  title: requiredText("Job title", 160),
  brand: requiredText("Job brand", 160),
  location: requiredText("Job location", 160),
  type: requiredText("Job type", 80),
  posted: requiredText("Posted label", 80),
  description: requiredText("Job description", 1200),
});

const eventSchema = z.object({
  title: requiredText("Event title", 160),
  brand: requiredText("Event brand", 160),
  date: requiredText("Event date", 120),
  location: requiredText("Event location", 160),
  description: requiredText("Event description", 1200),
  image: requiredText("Event image", 500),
});

export const siteContentSchema = z.object({
  navbar: z.object({
    brandPrefix: requiredText("Navbar brand prefix", 80),
    brandAccent: requiredText("Navbar brand accent", 80),
    links: z.array(linkSchema).min(1, "Add at least one navbar link."),
  }),
  footer: z.object({
    brandName: requiredText("Footer brand name", 120),
    description: requiredText("Footer description", 600),
    addressLine: requiredText("Footer address", 240),
    email: requiredText("Footer email", 120),
    socialLabel: requiredText("Footer social label", 80),
    socialUrl: requiredText("Footer social URL", 500),
    companyTitle: requiredText("Footer company title", 80),
    companyLinks: z.array(linkSchema).min(1, "Add at least one company link."),
    connectTitle: requiredText("Footer connect title", 80),
    connectLinks: z.array(linkSchema).min(1, "Add at least one connect link."),
    copyright: requiredText("Footer copyright", 240),
    legalLinks: z.array(linkSchema).min(1, "Add at least one legal link."),
  }),
  home: z.object({
    hero: z.object({
      titleLineOne: requiredText("Home hero title line one", 160),
      titleLineTwo: requiredText("Home hero title line two", 160),
      description: requiredText("Home hero description", 1200),
      ctaLabel: requiredText("Home hero CTA", 80),
    }),
    about: z.object({
      title: requiredText("Home about title", 120),
      paragraphs: z.array(requiredText("Home about paragraph", 5000)).min(1, "Add at least one about paragraph."),
      stats: z.array(statSchema).min(1, "Add at least one home stat."),
    }),
    mission: z.object({
      eyebrow: requiredText("Mission eyebrow", 80),
      quote: requiredText("Mission quote", 600),
    }),
    vision: z.object({
      title: requiredText("Vision title", 120),
      description: requiredText("Vision description", 600),
      items: z.array(titledDescriptionSchema).min(1, "Add at least one vision item."),
    }),
  }),
  brandsPage: z.object({
    hero: heroSchema,
    emptyState: requiredText("Brands empty state", 240),
    readMoreLabel: requiredText("Read more label", 80),
    readLessLabel: requiredText("Read less label", 80),
    websiteLabel: requiredText("Website label", 80),
  }),
  contact: z.object({
    hero: heroSchema,
    form: z.object({
      title: requiredText("Contact form title", 120),
      nameLabel: requiredText("Name label", 80),
      namePlaceholder: requiredText("Name placeholder", 120),
      emailLabel: requiredText("Email label", 80),
      emailPlaceholder: requiredText("Email placeholder", 120),
      typeLabel: requiredText("Inquiry type label", 80),
      inquiryOptions: z.array(requiredText("Inquiry option", 80)).min(1, "Add at least one inquiry type."),
      messageLabel: requiredText("Message label", 80),
      messagePlaceholder: requiredText("Message placeholder", 240),
      submitLabel: requiredText("Contact submit label", 80),
    }),
    details: z.object({
      headquartersTitle: requiredText("Headquarters title", 120),
      addressLines: z.array(requiredText("Address line", 160)).min(1, "Add at least one address line."),
      mapsLabel: requiredText("Maps label", 80),
      mapsUrl: requiredText("Maps URL", 500),
      emailTitle: requiredText("Contact email title", 80),
      email: requiredText("Contact email", 120),
      phoneTitle: requiredText("Contact phone title", 80),
      phone: requiredText("Contact phone", 80),
    }),
  }),
  careers: z.object({
    hero: heroSchema,
    highlights: z.array(titledDescriptionSchema).min(1, "Add at least one careers highlight."),
    jobsSectionTitle: requiredText("Jobs section title", 120),
    jobsSectionTag: requiredText("Jobs section tag", 120),
    applyLabel: requiredText("Apply label", 80),
    jobs: z.array(jobSchema).min(1, "Add at least one job."),
  }),
  events: z.object({
    hero: heroSchema,
    spotlight: z.object({
      eyebrow: requiredText("Spotlight eyebrow", 120),
      titleLineOne: requiredText("Spotlight title line one", 160),
      titleLineTwo: requiredText("Spotlight title line two", 160),
      description: requiredText("Spotlight description", 1200),
      featureItems: z.array(requiredText("Spotlight feature", 160)).min(1, "Add at least one spotlight feature."),
      image: requiredText("Spotlight image", 500),
    }),
    calendarTitle: requiredText("Calendar title", 120),
    calendarTag: requiredText("Calendar tag", 120),
    reserveLabel: requiredText("Reserve label", 80),
    items: z.array(eventSchema).min(1, "Add at least one event."),
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;

export const defaultSiteContent: SiteContent = siteContentSchema.parse(
  defaultSiteContentData,
);

export function cloneDefaultSiteContent(): SiteContent {
  return structuredClone(defaultSiteContent);
}