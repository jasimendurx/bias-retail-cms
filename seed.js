const SITE_CONTENT_BLOCK_ID = "site-content";

const brands = [
  {
    name: "American Vintage",
    category: "Fashion & Footwear",
    tagline: "The Art of Second Skin",
    description: "A French fashion house founded in 2005 by Michaël Azoulay, American Vintage reinvents wardrobe essentials into sophisticated, effortless pieces. It masterfully blends Californian ease with Parisian chic, focusing on natural materials.",
    details: "Known for its palette of nuanced colors and use of natural fibers, American Vintage has become a global reference for elevated basics.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2070",
    website: "https://www.americanvintage-store.com",
    presence: "Premium boutiques across key Middle East fashion hubs."
  },
  {
    name: "The Face Shop UAE",
    category: "Beauty & Accessories",
    tagline: "Natural Beauty Pioneer",
    description: "A global pioneer in Korean beauty since 2003, The Face Shop offers skincare and cosmetics inspired by the wisdom of nature.",
    details: "Under BIAS Retail LLC, The Face Shop has established a dominant presence in the UAE with 16 physical stores in premium locations.",
    image: "https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=2070",
    website: "https://thefaceshopuae.com",
    presence: "16 Stores across UAE"
  },
  {
    name: "Alain Ducasse Cafe",
    category: "Food & Beverage (F&B)",
    tagline: "Pinnacle of Culinary Art",
    description: "Representing the pinnacle of French culinary art, the Alain Ducasse Cafe brand represents culinary excellence and a contemporary approach to haute cuisine.",
    details: "The Ducasse philosophy centers on the product, respect for the earth, and the transmission of knowledge.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2070",
    website: "https://www.ducasse-paris.com",
    presence: "Exclusive boutiques and specialty dining concepts."
  }
];

async function main() {
  const nextEnvModule = await import("@next/env");
  const { loadEnvConfig } = nextEnvModule.default ?? nextEnvModule;

  loadEnvConfig(
    process.cwd(),
    process.env.NODE_ENV === "development",
    console,
    true,
  );

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL or DIRECT_URL is not configured.");
  }

  const [{ default: defaultSiteContent }, { PrismaPg }, { PrismaClient }] = await Promise.all([
    import("./src/lib/default-site-content.js"),
    import("@prisma/adapter-pg"),
    import("@prisma/client"),
  ]);

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.brand.deleteMany({});
    for (const brand of brands) {
      await prisma.brand.create({ data: brand });
    }

    await prisma.contentBlock.deleteMany({});
    await prisma.contentBlock.create({
      data: {
        id: SITE_CONTENT_BLOCK_ID,
        title: "Site Content",
        content: JSON.stringify(defaultSiteContent, null, 2),
      },
    });

    console.log("Database seeded with brands and site content successfully!");
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
