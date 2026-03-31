"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";

const images = [
  { url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop", span: "row-span-2 col-span-2" },
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { url: "https://images.unsplash.com/photo-1493857671277-2276509939f3?q=80&w=2070&auto=format&fit=crop", span: "row-span-2 col-span-1" },
  { url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1914&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop", span: "row-span-1 col-span-1" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-black/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 text-accent-pink">
            <Instagram size={20} />
            <span className="font-bold tracking-[0.2em] uppercase text-xs">Instagram Feed</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Captured <span className="text-gradient">Moments</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Step into the most instagrammable cafe in Ahmedabad. Every corner is a masterpiece.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-4 md:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-[2rem] glass p-2 border border-white/5 hover:border-accent-purple/30 transition-all ${img.span}`}
            >
              <div className="w-full h-full overflow-hidden rounded-[1.5rem] relative">
                <img 
                  src={img.url} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-white">
                    <Heart size={20} className="fill-white" />
                    <span className="font-bold text-sm">240</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <MessageCircle size={20} className="fill-white" />
                    <span className="font-bold text-sm">12</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-accent-purple via-accent-blue to-accent-pink p-[1px] group">
            <div className="px-8 py-4 rounded-full bg-black text-white font-bold transition-all group-hover:bg-transparent flex items-center gap-3">
              Follow Us @meddys24
              <Instagram size={20} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
