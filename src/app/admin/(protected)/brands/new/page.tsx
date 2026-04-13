import { createBrand } from "@/actions/brands";
import BrandForm from "../BrandForm";

export const dynamic = "force-dynamic";

export default function NewBrand() {
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