"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, IndianRupee, Utensils, Clock, Heart, Share2 } from "lucide-react";
import { MenuItem } from "@/lib/store";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
}

export default function MenuItemModal({ isOpen, onClose, item }: MenuItemModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl glass-dark rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 rounded-2xl glass border border-white/10 text-white/40 hover:text-white transition-all"
            >
              <X size={24} />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              
              <div className="absolute bottom-6 left-6 flex gap-3">
                <div className="px-4 py-2 rounded-xl glass border border-white/20 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <Star size={14} className="text-accent-purple fill-accent-purple" />
                  {item.rating}
                </div>
                <div className="px-4 py-2 rounded-xl glass border border-white/20 text-white font-black text-xs uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 text-accent-purple font-black text-xs uppercase tracking-[0.3em] mb-4">
                  <Utensils size={14} />
                  Premium {item.category}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {item.name}
                </h2>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <IndianRupee size={24} className="text-accent-purple" />
                    <span className="text-3xl font-black text-white">{item.price}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="flex items-center gap-2 text-white/40 font-medium">
                    <Clock size={18} />
                    <span>15-20 mins</span>
                  </div>
                </div>

                <p className="text-white/60 text-lg leading-relaxed font-light mb-10">
                  {item.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-black text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Order Now
                  </button>
                  <div className="flex gap-4">
                    <button className="p-5 rounded-2xl glass border border-white/10 text-white hover:bg-white/5 transition-all">
                      <Heart size={24} />
                    </button>
                    <button className="p-5 rounded-2xl glass border border-white/10 text-white hover:bg-white/5 transition-all">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080808] bg-white/10 flex items-center justify-center overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-white/20 text-xs font-bold uppercase tracking-widest">
                    Loved by 120+ guests this week
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
