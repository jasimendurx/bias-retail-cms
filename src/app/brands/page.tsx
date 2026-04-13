import BrandsList from "./BrandsList";
import { listBrands } from "@/lib/brands";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function BrandsPage() {
  const [brands, siteContent] = await Promise.all([listBrands(), getSiteContent()]);
  
  return <BrandsList brands={brands} content={siteContent.brandsPage} />;
}
