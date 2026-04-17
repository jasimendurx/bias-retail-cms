"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

import type { SiteContent } from "@/lib/site-content-schema";

type ContactPageClientProps = {
  content: SiteContent["contact"];
};

function toTelHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export default function ContactPageClient({ content }: ContactPageClientProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const type = formData.get("type");
    const message = formData.get("message");

    const mailtoLink = `mailto:${content.details.email}?subject=Inquiry: ${type} from ${name}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
  };

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

        <div className="grid lg:grid-cols-12 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-7 glass p-12 lg:p-20 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group hover:border-accent/20 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] -z-10" />

            <h2 className="text-4xl font-serif font-semibold mb-12">{content.form.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-10 group/form">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 px-1">{content.form.nameLabel}</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={content.form.namePlaceholder}
                    className="w-full bg-white/2 border-b border-white/10 py-4 px-1 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all text-sm font-light"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 px-1">{content.form.emailLabel}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={content.form.emailPlaceholder}
                    className="w-full bg-white/2 border-b border-white/10 py-4 px-1 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all text-sm font-light"
                  />
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 px-1">{content.form.typeLabel}</label>
                  <select name="type" className="w-full bg-transparent border-b border-white/10 py-4 px-1 text-neutral-400 focus:outline-none focus:border-accent transition-all text-sm font-light appearance-none">
                    {content.form.inquiryOptions.map((option) => (
                      <option key={option} className="bg-neutral-900">{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 px-1">{content.form.messageLabel}</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder={content.form.messagePlaceholder}
                    className="w-full bg-white/2 border-b border-white/10 py-4 px-1 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-all text-sm font-light resize-none h-40"
                  />
                </div>
              </div>

              <div className="pt-8">
                <button type="submit" className="btn-primary inline-flex items-center space-x-4 bg-white text-black py-4 px-12 group/btn">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{content.form.submitLabel}</span>
                  <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-12 xl:col-span-5 space-y-10"
          >
            <div className="glass-card flex flex-col items-center justify-center p-12 text-center rounded-[3rem] border border-white/5 bg-white/2 space-y-8 hover:bg-white/5 transition-all duration-500">
              <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 shadow-xl">
                <MapPin size={32} />
              </div>
              <h3 className="text-3xl font-serif font-semibold">{content.details.headquartersTitle}</h3>
              <div className="space-y-4 text-neutral-500 font-light text-sm leading-relaxed max-w-xs uppercase tracking-widest italic">
                {content.details.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <a href={content.details.mapsUrl} className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.4em] text-accent hover:text-white transition-colors">
                <span>{content.details.mapsLabel}</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-1 gap-8">
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Mail size={24} />
                </div>
                <h4 className="text-xl font-serif font-semibold">{content.details.emailTitle}</h4>
                <a href={`mailto:${content.details.email}`} className="text-neutral-500 font-light text-sm hover:text-white transition-colors">{content.details.email}</a>
              </div>
              <div className="glass p-10 rounded-[2.5rem] border border-white/5 flex flex-col items-center justify-center text-center space-y-6 hover:bg-white/5 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  <Phone size={24} />
                </div>
                <h4 className="text-xl font-serif font-semibold">{content.details.phoneTitle}</h4>
                <a href={toTelHref(content.details.phone)} className="text-neutral-500 font-light text-sm hover:text-white transition-colors">{content.details.phone}</a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}