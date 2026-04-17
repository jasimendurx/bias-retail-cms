"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  className?: string;
  overlayColor?: string;
  speed?: number;
}

export default function ParallaxSection({
  children,
  backgroundImage,
  className,
  overlayColor = "rgba(0,0,0,0.5)",
  speed = 0.5,
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <section
      ref={ref}
      className={cn("relative overflow-hidden min-h-screen", className)}
    >
      <motion.div
        style={{ y, backgroundImage: `url(${backgroundImage})` }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      />
      <div 
        className="absolute inset-0 z-10" 
        style={{ backgroundColor: overlayColor }} 
      />
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </section>
  );
}
