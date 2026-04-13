import { Users, ShoppingBag, TrendingUp, Eye } from "lucide-react";

import { listBrands } from "@/lib/brands";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const brandCount = (await listBrands()).length;

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif font-bold text-white">Platform Overview</h1>
        <p className="text-neutral-400 font-light">Welcome back. Manage your global brand portfolio and content.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass space-y-4 rounded-2xl border border-white/5 bg-white/2 p-6">
          <div className="flex items-center justify-between text-accent">
            <ShoppingBag size={24} />
          </div>
          <p className="text-3xl font-serif text-white">{brandCount}</p>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Total Brands</p>
        </div>
        <div className="glass space-y-4 rounded-2xl border border-white/5 bg-white/2 p-6">
          <div className="flex items-center justify-between text-accent">
            <Users size={24} />
          </div>
          <p className="text-3xl font-serif text-white">0</p>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">New Inquiries</p>
        </div>
        <div className="glass space-y-4 rounded-2xl border border-white/5 bg-white/2 p-6">
          <div className="flex items-center justify-between text-accent">
            <Eye size={24} />
          </div>
          <p className="text-3xl font-serif text-white">0</p>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Platform Views</p>
        </div>
        <div className="glass space-y-4 rounded-2xl border border-white/5 bg-white/2 p-6">
          <div className="flex items-center justify-between text-accent">
            <TrendingUp size={24} />
          </div>
          <p className="text-3xl font-serif text-white">Healthy</p>
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">System Status</p>
        </div>
      </div>
    </div>
  );
}