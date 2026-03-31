"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-24 px-6 border-t border-white/5 bg-black/80">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black mb-4 text-gradient inline-block">M24</h2>
            <p className="text-white/40 max-w-xs leading-relaxed">
              Ahmedabad's most aesthetic late-night hub. Food, drinks, and box cricket experience redefined.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <Link href="#home" className="text-white/60 hover:text-white font-medium transition-colors">Home</Link>
            <Link href="#menu" className="text-white/60 hover:text-white font-medium transition-colors">Menu</Link>
            <Link href="#cricket" className="text-white/60 hover:text-white font-medium transition-colors">Cricket</Link>
            <Link href="#gallery" className="text-white/60 hover:text-white font-medium transition-colors">Gallery</Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/60 hover:text-accent-purple hover:border-accent-purple/40 transition-all">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/60 hover:text-accent-blue hover:border-accent-blue/40 transition-all">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/60 hover:text-accent-pink hover:border-accent-pink/40 transition-all">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/5">
          <p className="text-white/20 text-sm font-medium">
            © {currentYear} Meddys 24 Cafe. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="text-white/10 hover:text-white/30 text-[10px] font-black uppercase tracking-[0.3em] transition-all">
              Staff Portal
            </Link>
            <div className="flex items-center gap-1.5 text-white/20 text-sm font-medium">
              Designed with <Heart size={14} className="text-accent-pink fill-accent-pink" /> in Ahmedabad
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
