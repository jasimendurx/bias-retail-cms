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

export const defaultSiteContent: SiteContent = {
  navbar: {
    brandPrefix: "BIAS",
    brandAccent: "RETAIL",
    links: [
      { label: "Home", href: "/" },
      { label: "Brands", href: "/brands" },
      { label: "Events", href: "/events" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  footer: {
    brandName: "BIAS RETAIL",
    description:
      "Curating exceptional retail ecosystems and empowering premier global brands across the region.",
    addressLine: "HO, Al fatan Plaza, Alquoz, Dubai, UAE.",
    email: "contact@biasretail.com",
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/thefaceshopuae/",
    companyTitle: "Company",
    companyLinks: [
      { label: "Home", href: "/" },
      { label: "Our Brands", href: "/brands" },
      { label: "Events", href: "/events" },
      { label: "Careers", href: "/careers" },
    ],
    connectTitle: "Connect",
    connectLinks: [
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
    copyright: "© 2026 Bias Retail LLC. All Rights Reserved.",
    legalLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
  home: {
    hero: {
      titleLineOne: "Shaping the Future of",
      titleLineTwo: "Experiential Retail",
      description:
        "From cutting-edge fashion and revolutionary beauty to world-class culinary experiences, we bring legendary concepts directly to you.",
      ctaLabel: "Explore Our Brands",
    },
    about: {
      title: "About Us",
      paragraphs: [
        "BIAS Retail LLC is a dynamic retail franchise organization established in 2012 with a clear mission: to bring exceptional international brands to the Middle East and elevate the region's retail landscape. With deep-rooted market expertise and a passion for innovation, we specialize in building and scaling select global brands across Fashion, Beauty, and Hospitality.",
        "Over the years, our portfolio has grown to include iconic names such as American Vintage, The Face Shop UAE, and hospitality concepts associated with the culinary excellence of Alain Ducasse Cafe. Each partnership reflects our commitment to quality, authenticity, and customer-centric retailing.",
        "At BIAS Retail LLC, we pride ourselves on crafting fresh and engaging retail platforms that deliver memorable shopping and lifestyle experiences. We work closely with industry-leading partners to ensure that our stores consistently exceed customer expectations - from curated selections to immersive brand environments.",
        "Our approach is built on long-term, mutually rewarding relationships with global brands, enabling us to introduce distinctive concepts, world-class products, and premium experiences to customers across the Middle East.",
        "With a focus on Fashion & Footwear, Beauty & Lifestyle, and Hospitality, we continue to drive growth by bringing in-demand international brands closer to local audiences, while upholding the highest operational and service standards.",
      ],
      stats: [
        { value: "12+", label: "Years Experience" },
        { value: "16", label: "UAE Locations" },
      ],
    },
    mission: {
      eyebrow: "Our Mission",
      quote:
        '"To bring exceptional international brands to the Middle East and elevate the region\'s retail landscape."',
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the premier partner for transformative retail experiences, shaping long-term brand success through innovation and uncompromising quality.",
      items: [
        {
          title: "Curated Brands",
          description:
            "Partnering with world-renowned names across Fashion, Beauty, and F&B to deliver prestige and quality.",
        },
        {
          title: "Premium Experiences",
          description:
            "Elevating customer journeys through immersive store designs and uncompromised service standards.",
        },
        {
          title: "Sustainable Growth",
          description:
            "Nurturing brands with a long-term strategic vision, focusing on sustainable and dynamic market expansion.",
        },
      ],
    },
  },
  brandsPage: {
    hero: {
      eyebrow: "The Portfolio",
      titleLineOne: "Global",
      titleLineTwo: "Curations",
      description:
        "We manage a select portfolio of world-class brands, bridging the gap between international brand heritage and regional market dominance.",
    },
    emptyState: "No brands found. Add some from the admin dashboard.",
    readMoreLabel: "Read More",
    readLessLabel: "Read Less",
    websiteLabel: "Official Platform",
  },
  contact: {
    hero: {
      eyebrow: "Global Presence",
      titleLineOne: "Elevating",
      titleLineTwo: "Retail Engagement",
      description:
        "Connect with our team of retail specialists to explore brand partnership opportunities or operational inquiries in the Middle East.",
    },
    form: {
      title: "Send an Inquiry",
      nameLabel: "Full Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      typeLabel: "Inquiry Type",
      inquiryOptions: [
        "Brand Partnership",
        "Retail Operations",
        "Careers",
        "General Inquiry",
      ],
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your inquiry...",
      submitLabel: "Transmit Inquiry",
    },
    details: {
      headquartersTitle: "Headquarters",
      addressLines: [
        "BIAS Retail LLC Office",
        "P.O. Box 12345, Dubai",
        "United Arab Emirates",
      ],
      mapsLabel: "Open Maps",
      mapsUrl: "#",
      emailTitle: "Email",
      email: "info@biasretail.com",
      phoneTitle: "Phone",
      phone: "+971 4 000 0000",
    },
  },
  careers: {
    hero: {
      eyebrow: "Career Ecosystem",
      titleLineOne: "Powering",
      titleLineTwo: "Retail Excellence",
      description:
        "Join a dynamic franchise organization committed to professional growth, innovation, and the delivery of premier global brand experiences.",
    },
    highlights: [
      {
        title: "Innovation",
        description:
          "Redefining the regional retail landscape with cutting-edge concepts.",
      },
      {
        title: "Expertise",
        description:
          "Collaborating with global heritage brands and industry leaders.",
      },
      {
        title: "Growth",
        description:
          "A structural environment designed for professional upward mobility.",
      },
    ],
    jobsSectionTitle: "Available Opportunities",
    jobsSectionTag: "All Positions",
    applyLabel: "Apply Now",
    jobs: [
      {
        title: "Store Manager",
        brand: "The Face Shop UAE",
        location: "Dubai Mall, UAE",
        type: "Full-Time",
        posted: "2 days ago",
        description:
          "Lead our flagship store to excellence. We're looking for an experienced retail leader with a passion for beauty and customer-centric management.",
      },
      {
        title: "Fashion Consultant",
        brand: "American Vintage",
        location: "Mall of the Emirates, UAE",
        type: "Full-Time",
        posted: "1 week ago",
        description:
          "Be the face of Parisian chic. Provide exceptional styling advice and represent the American Vintage aesthetic in our premium boutique.",
      },
      {
        title: "Retail Operations Executive",
        brand: "BIAS Retail LLC",
        location: "Head Office, Dubai",
        type: "Full-Time",
        posted: "3 days ago",
        description:
          "Support our growing portfolio. Manage logistics, supply chain coordination, and operational standards across all brand platforms.",
      },
    ],
  },
  events: {
    hero: {
      eyebrow: "Retail Ecosystem Highlights",
      titleLineOne: "Curating",
      titleLineTwo: "Premium Experiences",
      description:
        "Explore our curated calendar of brand activations, seasonal previews, and exclusive retail events across our 16 UAE locations.",
    },
    spotlight: {
      eyebrow: "Spotlight Engagement",
      titleLineOne: "Elevating Retail Dynamics",
      titleLineTwo: "through Strategic Events",
      description:
        "At BIAS Retail LLC, we believe that retail is more than a transaction - it's an immersive multi-sensory journey. Our events are meticulously designed to foster deeper brand emotional connections.",
      featureItems: [
        "Immersive Brand Workshops",
        "Seasonal Lifestyle Previews",
        "Exclusive Partner Activations",
      ],
      image: "/premium_retail_hero_1774547784373.png",
    },
    calendarTitle: "Event Calendar",
    calendarTag: "Full Calendar",
    reserveLabel: "Reserve Spot",
    items: [
      {
        title: "Alain Ducasse Specialty Coffee Premiere",
        brand: "Alain Ducasse",
        date: "April 12, 2026",
        location: "City Walk, Dubai",
        description:
          "Experience the art of roasting. Join us for an exclusive unveiling of the newest specialty blends personally curated for the Middle East market.",
        image: "/dining_brand_bg_1774547921100.png",
      },
      {
        title: "American Vintage SS26 Collection Preview",
        brand: "American Vintage",
        date: "May 5, 2026",
        location: "Dubai Mall, UAE",
        description:
          "An intimate showcase of the Spring/Summer 2026 'Second Skin' collection. Explore the palette of the upcoming season with our master stylists.",
        image: "/fashion_brand_bg_1774547868766.png",
      },
      {
        title: "The Face Shop UAE Skin-First Workshop",
        brand: "The Face Shop UAE",
        date: "May 20, 2026",
        location: "Dubai Marina Mall, UAE",
        description:
          "Unlock the secrets of Clean Beauty. A deep-dive workshop into natural ingredients and personalized K-beauty skincare routines.",
        image: "/beauty_brand_bg_1774547894746.png",
      },
    ],
  },
};

export function cloneDefaultSiteContent(): SiteContent {
  return structuredClone(defaultSiteContent);
}