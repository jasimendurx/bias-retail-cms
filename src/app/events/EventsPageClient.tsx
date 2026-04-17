"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight, Star, Plus } from "lucide-react";
import Image from "next/image";

import type { SiteContent } from "@/lib/site-content-schema";

type EventsPageClientProps = {
  content: SiteContent["events"];
};

export default function EventsPageClient({ content }: EventsPageClientProps) {
  return (
    <div className="flex flex-col w-full pt-40 pb-40 px-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-32 section-header text-left">
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

        <div className="mb-40 grid lg:grid-cols-12 gap-12 items-center bg-white/2 glass p-12 lg:p-20 rounded-[3rem] border border-white/5">
          <div className="lg:col-span-12 space-y-6 mb-8 lg:mb-12">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">{content.spotlight.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">{content.spotlight.titleLineOne} <br /> {content.spotlight.titleLineTwo}</h2>
          </div>

          <div className="lg:col-span-7 aspect-[16/9] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image src={content.spotlight.image} alt={content.spotlight.titleLineOne} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <p className="text-neutral-500 font-light leading-relaxed italic text-lg">
              {content.spotlight.description}
            </p>
            <div className="pt-4 flex flex-col space-y-6 border-t border-white/10">
              {content.spotlight.featureItems.map((feature) => (
                <div key={feature} className="flex items-center space-x-3 text-white text-sm font-light">
                  <Star size={16} className="text-accent" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-serif font-semibold">{content.calendarTitle}</h2>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 font-bold underline decoration-accent underline-offset-8 decoration-2">{content.calendarTag}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.items.map((event, index) => (
              <motion.div
                key={`${event.title}-${event.date}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass group relative overflow-hidden rounded-[2.5rem] bg-white/2 border border-white/5 transition-all hover:-translate-y-2 hover:border-accent/30"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute top-6 right-6 glass p-2 rounded-full border border-white/10 text-white group-hover:bg-accent group-hover:text-black transition-all">
                    <Plus size={16} />
                  </div>
                </div>

                <div className="p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-3 py-1 rounded-md">{event.brand}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-white leading-tight group-hover:text-accent transition-colors">{event.title}</h3>
                  <div className="space-y-4 text-neutral-500 font-light text-sm">
                    <p className="italic">&ldquo;{event.description}&rdquo;</p>
                    <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-2">
                        <Calendar size={14} className="text-accent/50" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} className="text-accent/50" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-10 pb-10">
                  <button className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white hover:text-accent transition-colors">
                    <span>{content.reserveLabel}</span>
                    <ArrowRight size={14} />
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