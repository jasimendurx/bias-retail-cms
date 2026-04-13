import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

import { deleteBrand } from "@/actions/brands";
import { listBrands } from "@/lib/brands";

const statusMessages = {
  created: "Brand created.",
  updated: "Brand updated.",
  deleted: "Brand deleted.",
} as const;

export const dynamic = "force-dynamic";

export default async function AdminBrands({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [{ status }, brands] = await Promise.all([searchParams, listBrands()]);
  const statusMessage = status
    ? statusMessages[status as keyof typeof statusMessages]
    : undefined;

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif font-bold text-white">Manage Brands</h1>
          <p className="text-neutral-400 font-light">Add, update, or remove brands from your portfolio.</p>
        </div>
        <Link href="/admin/brands/new" className="btn-primary inline-flex items-center space-x-2 px-6 py-3">
          <Plus size={16} />
          <span>Add Brand</span>
        </Link>
      </div>

      {statusMessage ? (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm font-light text-emerald-200">
          {statusMessage}
        </div>
      ) : null}

      <div className="glass overflow-hidden rounded-[2rem] border border-white/5 bg-white/2">
        <table className="w-full text-left text-sm font-light text-neutral-300">
          <thead className="border-b border-white/5 bg-white/5 text-xs font-bold uppercase tracking-widest text-neutral-500">
            <tr>
              <th className="px-6 py-5">Brand Name</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Stores</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr key={brand.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                <td className="px-6 py-6 text-lg font-semibold font-serif text-white">{brand.name}</td>
                <td className="px-6 py-6 text-accent">{brand.category}</td>
                <td className="max-w-xs truncate px-6 py-6">{brand.presence || "N/A"}</td>
                <td className="px-6 py-6">
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/brands/${brand.id}`}
                      className="text-blue-500 transition-colors hover:text-blue-400"
                      aria-label={`Edit ${brand.name}`}
                    >
                      <Edit size={18} />
                    </Link>
                    <form action={deleteBrand}>
                      <input type="hidden" name="id" value={brand.id} />
                      <button
                        type="submit"
                        className="text-red-500 transition-colors hover:text-red-400"
                        aria-label={`Delete ${brand.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">No brands found. Click &quot;Add Brand&quot; to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}