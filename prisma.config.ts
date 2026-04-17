import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(
  process.cwd(),
  process.env.NODE_ENV === "development",
  console,
  true,
);

const databaseUrl =
  process.env["DIRECT_URL"] ||
  process.env["DATABASE_URL"] ||
  "postgresql://postgres:postgres@127.0.0.1:5432/postgres";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
