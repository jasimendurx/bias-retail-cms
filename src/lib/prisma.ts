import { ensureServerEnv } from "@/lib/load-env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

ensureServerEnv();

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

export const prisma =
	connectionString
		? globalForPrisma.prisma ??
			new PrismaClient({
				adapter: new PrismaPg({ connectionString }),
			})
		: null;

if (process.env.NODE_ENV !== "production" && prisma) {
	globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured() {
	return Boolean(connectionString);
}

export function requirePrisma() {
	if (!prisma) {
		throw new Error("DATABASE_URL is not configured.");
	}

	return prisma;
}
