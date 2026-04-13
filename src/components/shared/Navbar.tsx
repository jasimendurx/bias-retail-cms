"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import type { SiteContent } from "@/lib/site-content-schema";

type NavbarProps = {
  brandPrefix: string;
  brandAccent: string;
  links: SiteContent["navbar"]["links"];
};

export default function Navbar({ brandPrefix, brandAccent, links }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
        scrolled ? "bg-black/85 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="text-2xl font-serif font-bold tracking-widest text-white group"
        >
          {brandPrefix} <span className="group-hover:text-accent transition-colors">{brandAccent}</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-all relative py-2 ${
                pathname === link.href ? "text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              {link.label}
              {(pathname === link.href) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/5 p-8 md:hidden"
        >
          <div className="flex flex-col space-y-6">
            {links.map((link) => (
              <Link
                key={`${link.label}-${link.href}-mobile`}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm uppercase tracking-widest font-medium ${
                  pathname === link.href ? "text-accent" : "text-neutral-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
