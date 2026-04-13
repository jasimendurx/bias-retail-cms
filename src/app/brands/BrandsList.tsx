"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Globe } from "lucide-react";
import { useState } from "react";
import type { Brand } from "@prisma/client";

import type { SiteContent } from "@/lib/site-content-schema";

export default function BrandsList({
  brands,
  content,
}: {
  brands: Brand[];
  content: SiteContent["brandsPage"];
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col w-full pt-40 pb-40 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="max-w-2xl mb-32 section-header text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">{content.hero.eyebrow}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-semibold mb-10 leading-tight"
          >
            {content.hero.titleLineOne} <br /> <span className="text-neutral-500">{content.hero.titleLineTwo}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 font-light leading-relaxed max-w-xl"
          >
            {content.hero.description}
          </motion.p>
        </div>

        {/* Brands List */}
        <div className="space-y-40">
          {brands.length === 0 && (
            <p className="text-neutral-500 text-center py-20 font-light">{content.emptyState}</p>
          )}
          {brands.map((brand, i) => (
            <motion.section
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group"
            >
              <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                <div className={`lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-12 left-12 text-white z-10 space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">{brand.category}</p>
                    <h2 className="text-4xl md:text-6xl font-serif font-semibold tracking-tight">{brand.name}</h2>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-10 pt-4">
                  <div className="space-y-6">
                    {brand.tagline && <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500">{brand.tagline}</p>}
                    <p className="text-xl text-neutral-300 font-light leading-relaxed font-serif italic">
                      &ldquo;{brand.description}&rdquo;
                    </p>
                  </div>

                  {brand.presence && (
                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[9px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                           {brand.presence}
                        </span>
                    </div>
                  )}

                  <div className="pt-6 flex flex-col space-y-6">
                    <button 
                      onClick={() => setExpandedId(expandedId === brand.id ? null : brand.id)}
                      className="inline-flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.4em] text-accent hover:text-white transition-colors group"
                    >
                      <span className="w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center group-hover:border-white transition-colors">
                        {expandedId === brand.id ? <Minus size={14} /> : <Plus size={14} />}
                      </span>
                      <span>{expandedId === brand.id ? content.readLessLabel : content.readMoreLabel}</span>
                    </button>

                    <AnimatePresence>
                      {expandedId === brand.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 pb-4 space-y-10 border-t border-white/5 mt-4">
                            <p className="text-sm text-neutral-400 font-light italic">
                              {brand.details}
                            </p>
                            
                            <div className="flex items-center justify-between pt-6">
                              {brand.website && (
                                <a 
                                  href={brand.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.4em] text-white hover:text-accent transition-colors group"
                                >
                                  <Globe size={18} />
                                  <span className="border-b border-white/20 group-hover:border-accent transition-all">{content.websiteLabel}</span>
                                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
