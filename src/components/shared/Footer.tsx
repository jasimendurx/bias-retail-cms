import { Mail, MapPin } from "lucide-react";

import type { SiteContent } from "@/lib/site-content-schema";

type FooterProps = {
  content: SiteContent["footer"];
};

export default function Footer({ content }: FooterProps) {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-serif font-bold tracking-widest text-white">{content.brandName}</h3>
            <p className="text-neutral-500 max-w-sm leading-relaxed font-light">
              {content.description}
            </p>
            <div className="flex flex-col space-y-4 text-neutral-400 mt-6 pt-2 border-t border-white/5 inline-block">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <MapPin size={14} className="text-accent shrink-0" />
                  <span className="text-sm font-light">{content.addressLine}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={14} className="text-accent shrink-0" />
                  <a href={`mailto:${content.email}`} className="text-sm font-light hover:text-white transition-colors">{content.email}</a>
                </div>
              </div>
              <div className="flex space-x-6 pt-2">
                <a href={content.socialUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent cursor-pointer transition-colors text-xs uppercase tracking-widest font-bold">{content.socialLabel}</a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-white">{content.companyTitle}</h4>
            <nav className="flex flex-col space-y-4">
              {content.companyLinks.map((link) => (
                <a 
                  key={`${link.label}-${link.href}`} 
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition-all text-sm font-light hover:pl-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect Links */}
          <div className="space-y-6">
            <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-white">{content.connectTitle}</h4>
            <nav className="flex flex-col space-y-4">
              {content.connectLinks.map((link) => (
                <a 
                  key={`${link.label}-${link.href}`} 
                  href={link.href}
                  className="text-neutral-500 hover:text-white transition-all text-sm font-light hover:pl-2"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-xs font-light">
            {content.copyright}
          </p>
          <div className="flex space-x-8 text-neutral-500 text-xs font-light">
            {content.legalLinks.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href} className="hover:text-white transition-colors">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
