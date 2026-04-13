import { notFound } from "next/navigation";

import { updateBrand } from "@/actions/brands";
import { getBrandById } from "@/lib/brands";

import BrandForm from "../BrandForm";

export const dynamic = "force-dynamic";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ brandId: string }>;
}) {
  const { brandId } = await params;
  const brand = await getBrandById(brandId);

  if (!brand) {
    notFound();
  }

  return (
    <BrandForm
      action={updateBrand}
      brand={brand}
      heading="Edit Brand"
      description="Update the selected brand and publish the changes back to the public portfolio."
      submitLabel="Update Brand"
      pendingLabel="Updating..."
    />
  );
}