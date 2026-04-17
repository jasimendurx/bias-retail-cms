"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import type { AdminLoginActionState } from "@/app/admin/login/admin-login-state";
import {
  createAdminSession,
  deleteAdminSession,
  isAdminAuthenticated,
  sanitizeAdminRedirectPath,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

const adminLoginSchema = z.object({
  username: z.string().trim().min(1, "Enter your username."),
  password: z.string().min(1, "Enter your password."),
  next: z.string().optional(),
});

export async function loginAdmin(
  _previousState: AdminLoginActionState,
  formData: FormData,
): Promise<AdminLoginActionState> {
  const parsed = adminLoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    next: formData.get("next") ?? "/admin",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message || "Review your credentials and try again.",
    };
  }

  const isAuthenticated = await verifyAdminCredentials(
    parsed.data.username,
    parsed.data.password,
  );

  if (!isAuthenticated) {
    return {
      status: "error",
      message: "The CMS credentials were not accepted.",
    };
  }

  await createAdminSession();
  redirect(sanitizeAdminRedirectPath(parsed.data.next));
}

export async function logoutAdmin() {
  if (await isAdminAuthenticated()) {
    await deleteAdminSession();
  }

  redirect("/admin/login");
}