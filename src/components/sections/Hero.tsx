"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import BookingModal from "../ui/BookingModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with parallax effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 via-transparent to-accent-pink/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full glass border border-white/10 text-white/80 text-xs font-semibold uppercase tracking-[0.2em]"
        >
          Ahmedabad's Premium Hub
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          Ahmedabad’s Most <br />
          <span className="text-gradient">Aesthetic Cafe Experience</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Meddys 24 Cafe: Where premium ambiance meets Gen-Z vibes. Food, drinks, and the ultimate BOX CRICKET experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold flex items-center justify-center gap-2 group hover:bg-accent-purple hover:text-white transition-all duration-300"
          >
            Book a Table
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a 
            href="#cricket"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-white/20 text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300"
          >
            <Trophy size={20} className="text-accent-blue" />
            Play Box Cricket
          </a>
        </motion.div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="table"
      />

      {/* Floating neon glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-pink/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
