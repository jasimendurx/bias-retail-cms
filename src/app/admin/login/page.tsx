import { redirect } from "next/navigation";

import AdminLoginForm from "./AdminLoginForm";

import {
  isAdminConfigured,
  sanitizeAdminRedirectPath,
} from "@/lib/admin-auth-shared";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  if (!(isAdminConfigured())) {
    if (process.env.NODE_ENV !== "production") {
      redirect("/admin");
    }

    return (
      <main className="min-h-screen bg-[#050505] px-6 py-20 text-white">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">
          <h1 className="text-3xl font-serif font-semibold">CMS login is not configured</h1>
          <p className="mt-4 text-sm leading-7 text-neutral-400">
            Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` before using the CMS login page.
          </p>
        </div>
      </main>
    );
  }

  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const resolvedSearchParams = await searchParams;
  const nextPath = sanitizeAdminRedirectPath(resolvedSearchParams?.next);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-20 lg:flex-row lg:items-center lg:gap-20">
        <section className="max-w-xl space-y-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-500">
            CMS Access
          </p>
          <h1 className="text-5xl font-serif font-semibold leading-tight text-white">
            Sign in to manage brands, content, and admin updates.
          </h1>
          <p className="max-w-lg text-base leading-8 text-neutral-400">
            This login page replaces the browser prompt. Use the CMS credentials configured for this deployment to access the protected admin area.
          </p>
        </section>

        <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="mb-8 space-y-2">
            <h2 className="text-2xl font-semibold text-white">Admin login</h2>
            <p className="text-sm text-neutral-400">
              Enter your CMS credentials to continue.
            </p>
          </div>

          <AdminLoginForm nextPath={nextPath} />
        </section>
      </div>
    </main>
  );
}