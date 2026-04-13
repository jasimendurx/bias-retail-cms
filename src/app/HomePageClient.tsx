"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, ShoppingBag, Target } from "lucide-react";

import type { SiteContent } from "@/lib/site-content-schema";

const visionItems = [
  {
    title: "Curated Brands",
    description:
      "Partnering with world-renowned names across Fashion, Beauty, and F&B to deliver prestige and quality.",
    icon: <ShoppingBag size={24} />,
  },
  {
    title: "Premium Experiences",
    description:
      "Elevating customer journeys through immersive store designs and uncompromised service standards.",
    icon: <Eye size={24} />,
  },
  {
    title: "Sustainable Growth",
    description:
      "Nurturing brands with a long-term strategic vision, focusing on sustainable and dynamic market expansion.",
    icon: <Target size={24} />,
  },
];

type HomePageClientProps = {
  content: SiteContent["home"];
};

export default function HomePageClient({
  content,
}: HomePageClientProps) {
  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">
      <section className="relative h-screen w-full flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
            alt="Premium Retail Environment"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-background z-10" />
        </div>

        <div className="relative z-20 max-w-4xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif text-white leading-tight font-semibold"
          >
            {content.hero.titleLineOne} <br /> {content.hero.titleLineTwo}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {content.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Link href="/brands" className="btn-primary">
              <span>{content.hero.ctaLabel}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white">
              {content.about.title}
            </h2>
            <div className="w-10 h-[2px] bg-accent" />
            <div className="space-y-4 text-neutral-400 leading-relaxed font-light text-base lg:text-lg">
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex space-x-12 pt-8 border-t border-white/10 mt-8">
              {content.about.stats.map((stat) => (
                <div key={`${stat.value}-${stat.label}`} className="space-y-1">
                  <p className="text-accent text-3xl font-serif">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 aspect-[4/5] relative rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image
              src="/fusion_hero.png"
              alt="Corporate Retail Fusion"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-neutral-950/50 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-sm uppercase tracking-widest text-accent font-semibold">
            {content.mission.eyebrow}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-white leading-tight font-medium"
          >
            {content.mission.quote}
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold relative inline-block after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-10 after:h-[2px] after:bg-accent text-white">
              {content.vision.title}
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto font-light mt-6 pt-4">
              {content.vision.description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.vision.items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card hover:border-accent/40 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  {visionItems[index % visionItems.length]?.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-white">
                  {item.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed font-light text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}