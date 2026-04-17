"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Building, ArrowRight, Star } from "lucide-react";

import type { SiteContent } from "@/lib/site-content-schema";

const highlightIcons = [Star, Building, Briefcase];

type CareersPageClientProps = {
  content: SiteContent["careers"];
};

export default function CareersPageClient({ content }: CareersPageClientProps) {
  return (
    <div className="flex flex-col w-full pt-40 pb-40 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
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

        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {content.highlights.map((item, index) => {
            const Icon = highlightIcons[index % highlightIcons.length];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-10 rounded-[2.5rem] border border-white/5 bg-white/2"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 shadow-xl">
                  <Icon size={20} />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-semibold">{content.jobsSectionTitle}</h2>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-bold underline decoration-accent underline-offset-8 decoration-2">{content.jobsSectionTag}</p>
          </div>

          <div className="grid gap-6">
            {content.jobs.map((job, index) => (
              <motion.div
                key={`${job.title}-${job.brand}`}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card hover:bg-white/5 border border-white/5 group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 p-10 md:p-12 rounded-[2.5rem]"
              >
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-3 py-1 rounded-md">{job.brand}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-white group-hover:text-accent transition-colors">{job.title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed italic">{job.description}</p>
                  <div className="flex items-center space-x-6 text-neutral-500">
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} className="text-accent/50" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{job.location}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{job.posted}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white hover:text-accent transition-colors group">
                    <span>{content.applyLabel}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}