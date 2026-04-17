import "server-only";

import { getPrisma, isDatabaseConfigured } from "@/lib/prisma";

export async function listBrands() {
  const prisma = getPrisma();

  if (!isDatabaseConfigured() || !prisma) {
    return [];
  }

  return prisma.brand.findMany({
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });
}

export async function getBrandById(id: string) {
  const prisma = getPrisma();

  if (!isDatabaseConfigured() || !prisma) {
    return null;
  }

  return prisma.brand.findUnique({
    where: { id },
  });
}