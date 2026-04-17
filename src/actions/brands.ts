"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdminSession } from "@/lib/admin-auth";
import { requirePrisma } from "@/lib/prisma";

const requiredText = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be ${max} characters or fewer.`);

const optionalText = (max: number) =>
  z.string().trim().max(max, `${max} character limit exceeded.`);

const brandFormSchema = z.object({
  id: z.string().trim().optional(),
  name: requiredText("Brand name", 160),
  category: requiredText("Category", 160),
  tagline: optionalText(160),
  description: optionalText(1200),
  details: optionalText(5000),
  image: requiredText("Image", 500),
  website: optionalText(500),
  presence: optionalText(160),
});

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function toOptionalString(value: string) {
  return value.trim() ? value.trim() : undefined;
}

function parseBrandFormData(formData: FormData) {
  const parsed = brandFormSchema.safeParse({
    id: getFormValue(formData, "id"),
    name: getFormValue(formData, "name"),
    category: getFormValue(formData, "category"),
    tagline: getFormValue(formData, "tagline"),
    description: getFormValue(formData, "description"),
    details: getFormValue(formData, "details"),
    image: getFormValue(formData, "image"),
    website: getFormValue(formData, "website"),
    presence: getFormValue(formData, "presence"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid brand payload.");
  }

  return {
    id: toOptionalString(parsed.data.id || ""),
    data: {
      name: parsed.data.name,
      category: parsed.data.category,
      tagline: parsed.data.tagline,
      description: parsed.data.description,
      details: parsed.data.details,
      image: parsed.data.image,
      website: toOptionalString(parsed.data.website),
      presence: toOptionalString(parsed.data.presence),
    },
  };
}

function revalidateBrandPaths(brandId?: string) {
  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath("/admin");
  revalidatePath("/admin/brands");

  if (brandId) {
    revalidatePath(`/admin/brands/${brandId}`);
  }
}

export async function createBrand(formData: FormData) {
  await requireAdminSession("/admin/brands/new");
  const { data } = parseBrandFormData(formData);
  const prisma = requirePrisma();

  const brand = await prisma.brand.create({
    data,
  });

  revalidateBrandPaths(brand.id);
  redirect("/admin/brands?status=created");
}

export async function updateBrand(formData: FormData) {
  await requireAdminSession("/admin/brands");
  const { id, data } = parseBrandFormData(formData);
  const prisma = requirePrisma();

  if (!id) {
    throw new Error("Brand id is required.");
  }

  const brand = await prisma.brand.update({
    where: { id },
    data,
  });

  revalidateBrandPaths(brand.id);
  redirect("/admin/brands?status=updated");
}

export async function deleteBrand(formData: FormData) {
  await requireAdminSession("/admin/brands");
  const id = toOptionalString(getFormValue(formData, "id"));
  const prisma = requirePrisma();

  if (!id) {
    throw new Error("Brand id is required.");
  }

  await prisma.brand.delete({
    where: { id },
  });

  revalidateBrandPaths(id);
  redirect("/admin/brands?status=deleted");
}
