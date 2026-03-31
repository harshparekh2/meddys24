"use client";

import { motion } from "framer-motion";
import { Home, Utensils, Trophy, Image, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: Utensils, label: "Menu", href: "#menu" },
  { icon: Trophy, label: "Cricket", href: "#cricket" },
  { icon: Image, label: "Gallery", href: "#gallery" },
  { icon: MessageSquare, label: "Contact", href: "#contact" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
    >
      <nav className="glass-dark rounded-3xl px-6 py-4 flex items-center justify-between shadow-2xl border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center gap-1 group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white/60 group-hover:text-accent-purple transition-colors"
              >
                <Icon size={24} strokeWidth={2} />
              </motion.div>
              <span className="text-[10px] font-medium text-white/40 group-hover:text-white/80 transition-colors uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
}
