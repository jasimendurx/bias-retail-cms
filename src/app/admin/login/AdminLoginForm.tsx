"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import { loginAdmin } from "@/actions/admin-auth";

import { initialAdminLoginActionState } from "./admin-login-state";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:opacity-60"
    >
      <ShieldCheck size={16} />
      <span>{pending ? "Signing In..." : "Sign In to CMS"}</span>
    </button>
  );
}

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [state, formAction] = useActionState(
    loginAdmin,
    initialAdminLoginActionState,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={nextPath} />

      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Username
        </label>
        <input
          name="username"
          type="text"
          autoComplete="username"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-white/30"
          placeholder="Enter your CMS username"
          required
        />
      </div>

      <div className="space-y-3">
        <label className="block text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Password
        </label>
        <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 focus-within:border-white/30">
          <LockKeyhole size={16} className="mr-3 text-neutral-500" />
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-600"
            placeholder="Enter your CMS password"
            required
          />
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}