"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar } from "lucide-react";

export default function StickyCTA() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [300, 500], [0, 1]);
  const y = useTransform(scrollY, [300, 500], [20, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed top-6 right-6 z-50 md:hidden"
    >
      <button className="px-6 py-3 rounded-full bg-accent-purple text-white font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/20 backdrop-blur-md">
        <Calendar size={18} />
        Book Now
      </button>
    </motion.div>
  );
}
