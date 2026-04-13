import { createBrand } from "@/actions/brands";
import { requireAdminSession } from "@/lib/admin-auth";

import BrandForm from "../BrandForm";

export const dynamic = "force-dynamic";

export default async function NewBrand() {
  await requireAdminSession("/admin/brands/new");

  return (
    <BrandForm
      action={createBrand}
      heading="Add New Brand"
      description="Input the official details for the new global curation."
      submitLabel="Create Brand"
      pendingLabel="Creating..."
    />
  );
}