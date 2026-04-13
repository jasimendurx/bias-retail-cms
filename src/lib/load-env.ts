import { loadEnvConfig } from "@next/env";

let hasLoadedServerEnv = false;

export function ensureServerEnv() {
  if (hasLoadedServerEnv) {
    return;
  }

  loadEnvConfig(
    process.cwd(),
    process.env.NODE_ENV === "development",
    console,
    true,
  );
  hasLoadedServerEnv = true;
}