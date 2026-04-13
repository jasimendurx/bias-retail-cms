"use server";

import { revalidatePath } from "next/cache";

import type { SiteContentActionState } from "@/app/admin/content/site-content-action-state";
import { requireAdminSession } from "@/lib/admin-auth";
import { requirePrisma } from "@/lib/prisma";
import {
  SITE_CONTENT_BLOCK_ID,
  siteContentSchema,
} from "@/lib/site-content-schema";
import { serializeSiteContent } from "@/lib/site-content";

export async function saveSiteContent(
  _previousState: SiteContentActionState,
  formData: FormData,
): Promise<SiteContentActionState> {
  await requireAdminSession("/admin/content");

  const payload = formData.get("payload");

  if (typeof payload !== "string") {
    return {
      status: "error",
      message: "The content payload was missing from the request.",
    };
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(payload);
  } catch {
    return {
      status: "error",
      message: "The submitted content payload is not valid JSON.",
    };
  }

  const parsed = siteContentSchema.safeParse(parsedJson);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return {
      status: "error",
      message: firstIssue?.message || "Review the content fields and try again.",
    };
  }

  let prisma;

  try {
    prisma = requirePrisma();
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "DATABASE_URL is not configured.",
    };
  }

  await prisma.contentBlock.upsert({
    where: { id: SITE_CONTENT_BLOCK_ID },
    update: {
      title: "Site Content",
      content: serializeSiteContent(parsed.data),
    },
    create: {
      id: SITE_CONTENT_BLOCK_ID,
      title: "Site Content",
      content: serializeSiteContent(parsed.data),
    },
  });

  revalidatePath("/");
  revalidatePath("/brands");
  revalidatePath("/contact");
  revalidatePath("/careers");
  revalidatePath("/events");
  revalidatePath("/admin/content");

  return {
    status: "success",
    message: "Site content saved.",
  };
}