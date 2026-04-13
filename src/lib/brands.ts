import "server-only";

import { isDatabaseConfigured, prisma } from "@/lib/prisma";

export async function listBrands() {
  if (!isDatabaseConfigured() || !prisma) {
    return [];
  }

  return prisma.brand.findMany({
    orderBy: [{ createdAt: "asc" }, { id: "asc" }],
  });
}

export async function getBrandById(id: string) {
  if (!isDatabaseConfigured() || !prisma) {
    return null;
  }

  return prisma.brand.findUnique({
    where: { id },
  });
}