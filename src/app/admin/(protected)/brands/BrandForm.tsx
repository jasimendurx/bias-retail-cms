"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { ArrowLeft, Save } from "lucide-react";
import type { Brand } from "@prisma/client";

type BrandFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  brand?: Brand;
  heading: string;
  description: string;
  submitLabel: string;
  pendingLabel: string;
};

function SubmitButton({
  submitLabel,
  pendingLabel,
}: {
  submitLabel: string;
  pendingLabel: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="btn-primary group/btn inline-flex items-center space-x-4 bg-white px-12 py-4 text-black disabled:opacity-50"
    >
      {pending ? (
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
          {pendingLabel}
        </span>
      ) : (
        <>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            {submitLabel}
          </span>
          <Save
            size={16}
            className="transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1"
          />
        </>
      )}
    </button>
  );
}

export default function BrandForm({
  action,
  brand,
  heading,
  description,
  submitLabel,
  pendingLabel,
}: BrandFormProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-12 pb-20">
      <Link
        href="/admin/brands"
        className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} />
        <span>Back to Brands</span>
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-bold text-white">{heading}</h1>
        <p className="text-neutral-400 font-light">{description}</p>
      </div>

      <div className="glass group relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/2 p-10 shadow-2xl lg:p-14">
        <div className="absolute right-0 top-0 -z-10 h-64 w-64 bg-accent/5 blur-[100px]" />

        <form action={action} className="space-y-10 group/form">
          {brand ? <input type="hidden" name="id" value={brand.id} /> : null}

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Brand Name *
              </label>
              <input
                name="name"
                type="text"
                required
                defaultValue={brand?.name ?? ""}
                placeholder="e.g. American Vintage"
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Category *
              </label>
              <input
                name="category"
                type="text"
                required
                defaultValue={brand?.category ?? ""}
                placeholder="e.g. Fashion & Footwear"
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Tagline
              </label>
              <input
                name="tagline"
                type="text"
                defaultValue={brand?.tagline ?? ""}
                placeholder="e.g. The Art of Second Skin"
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Image Path or URL *
              </label>
              <input
                name="image"
                type="text"
                required
                defaultValue={brand?.image ?? ""}
                placeholder="/brand-image.png or https://..."
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Official Website
              </label>
              <input
                name="website"
                type="text"
                defaultValue={brand?.website ?? ""}
                placeholder="https://..."
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
            <div className="space-y-3">
              <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
                Presence Overview
              </label>
              <input
                name="presence"
                type="text"
                defaultValue={brand?.presence ?? ""}
                placeholder="e.g. 16 Stores across UAE"
                className="w-full border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              Short Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={brand?.description ?? ""}
              placeholder="A short overview of the brand..."
              className="w-full resize-y border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
            />
          </div>
          <div className="space-y-3">
            <label className="px-1 text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">
              Detailed Story
            </label>
            <textarea
              name="details"
              rows={6}
              defaultValue={brand?.details ?? ""}
              placeholder="Extended information about operations and heritage..."
              className="w-full resize-y border-b border-white/10 bg-white/2 px-1 py-4 text-sm font-light text-white placeholder:text-neutral-600 transition-all focus:border-accent focus:outline-none"
            />
          </div>

          <div className="pt-8">
            <SubmitButton submitLabel={submitLabel} pendingLabel={pendingLabel} />
          </div>
        </form>
      </div>
    </div>
  );
}