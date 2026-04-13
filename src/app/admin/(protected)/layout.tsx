import Link from "next/link";
import { LayoutDashboard, LogOut, ShoppingBag, Type } from "lucide-react";

import { logoutAdmin } from "@/actions/admin-auth";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-950 text-neutral-200">
      <aside className="flex w-64 flex-col justify-between border-r border-white/10 bg-black">
        <div>
          <div className="flex h-20 items-center border-b border-white/10 px-8">
            <h1 className="text-xl font-serif font-bold tracking-widest text-white">CMS</h1>
          </div>
          <nav className="mt-4 space-y-2 p-4">
            <Link href="/admin" className="flex items-center space-x-3 rounded-lg px-4 py-3 font-light transition-colors hover:bg-white/5">
              <LayoutDashboard size={18} className="text-accent" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/brands" className="flex items-center space-x-3 rounded-lg px-4 py-3 font-light transition-colors hover:bg-white/5">
              <ShoppingBag size={18} className="text-accent" />
              <span>Manage Brands</span>
            </Link>
            <Link href="/admin/content" className="flex items-center space-x-3 rounded-lg px-4 py-3 font-light transition-colors hover:bg-white/5">
              <Type size={18} className="text-accent" />
              <span>Site Content</span>
            </Link>
          </nav>
        </div>
        <div className="space-y-2 border-t border-white/10 p-4">
          <Link href="/" className="flex items-center space-x-3 rounded-lg px-4 py-3 font-light text-neutral-500 transition-colors hover:bg-white/5 hover:text-white">
            <Type size={18} />
            <span>Return to Site</span>
          </Link>
          <form action={logoutAdmin}>
            <button type="submit" className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left font-light text-neutral-500 transition-colors hover:bg-white/5 hover:text-white">
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background p-12">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}