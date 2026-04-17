import { ensureServerEnv } from "@/lib/load-env";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

ensureServerEnv();

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
const isCloudflareDeployment = process.env.DEPLOYMENT_TARGET === "cloudflare";

const globalForPrisma = globalThis as unknown as {
	prisma?: PrismaClient;
};

function createPrismaClient() {
	if (!connectionString) {
		return null;
	}

	return new PrismaClient({
		adapter: new PrismaPg({
			connectionString,
			...(isCloudflareDeployment ? { maxUses: 1 } : {}),
		}),
	});
}

const productionPrisma =
	process.env.NODE_ENV === "production" && !isCloudflareDeployment
		? createPrismaClient()
		: null;

export function getPrisma() {
	if (!connectionString) {
		return null;
	}

	if (isCloudflareDeployment) {
		return createPrismaClient();
	}

	if (process.env.NODE_ENV === "production") {
		return productionPrisma;
	}

	globalForPrisma.prisma ??= createPrismaClient() ?? undefined;
	return globalForPrisma.prisma ?? null;
}

export function isDatabaseConfigured() {
	return Boolean(connectionString);
}

export function requirePrisma() {
	const prisma = getPrisma();

	if (!prisma) {
		throw new Error("DATABASE_URL is not configured.");
	}

	return prisma;
}
