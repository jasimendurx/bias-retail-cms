import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ensureServerEnv } from "@/lib/load-env";
import { requirePrisma } from "@/lib/prisma";
import { serializeSiteContent } from "@/lib/site-content";
import {
  SITE_CONTENT_BLOCK_ID,
  defaultSiteContent,
} from "@/lib/site-content-schema";

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

export async function GET() {
  return NextResponse.json(
    { message: "Use POST to seed the database." },
    { status: 405 },
  );
}

export async function POST(request: Request) {
  ensureServerEnv();

  const seedSecret = process.env.SEED_SECRET;
  const providedSecret = request.headers.get("x-seed-secret");

  if (process.env.NODE_ENV === "production") {
    if (!seedSecret) {
      return NextResponse.json(
        { message: "Seeding is not configured for production." },
        { status: 503 },
      );
    }

    if (providedSecret !== seedSecret) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } else if (seedSecret && providedSecret !== seedSecret) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let prisma;

  try {
    prisma = requirePrisma();
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "DATABASE_URL is not configured.",
      },
      { status: 503 },
    );
  }

  await prisma.brand.deleteMany({});
  for (const b of brands) {
    await prisma.brand.create({ data: b });
  }

  // Seed site content payload for the editable CMS path.
  await prisma.contentBlock.deleteMany({});
  await prisma.contentBlock.create({
    data: {
      id: SITE_CONTENT_BLOCK_ID,
      title: "Site Content",
      content: serializeSiteContent(defaultSiteContent),
    },
  });

  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath("/contact");
  revalidatePath("/careers");
  revalidatePath("/events");
  revalidatePath("/admin");
  revalidatePath("/admin/brands");
  revalidatePath("/admin/content");

  return NextResponse.json({ message: "Seeded successfully!" });
}
