"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Clock, Calendar, Users, Star } from "lucide-react";
import { getStoreData, CricketSlot } from "@/lib/store";
import BookingModal from "../ui/BookingModal";

export default function BoxCricket() {
  const [slots, setSlots] = useState<CricketSlot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<CricketSlot | null>(null);

  useEffect(() => {
    // Initial load
    setSlots(getStoreData().slots);

    // Listen for storage changes to sync across tabs/components
    const handleStorage = () => setSlots(getStoreData().slots);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleBookingClick = (slot: CricketSlot) => {
    if (slot.status === "Available") {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  return (
    <section id="cricket" className="py-24 px-6 relative">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center gap-16">
          {/* Content */}
          <div className="w-full xl:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent-purple/20 text-accent-purple">
                  <Trophy size={20} />
                </div>
                <span className="text-accent-purple font-bold tracking-[0.2em] uppercase text-xs">Unique Feature</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Play Like a Pro <br />
                <span className="text-gradient">In Our Box Arena</span>
              </h2>
              
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
                Why just eat when you can compete? Our state-of-the-art Box Cricket arena 
                is designed for high-intensity matches under neon lights. Perfect for 
                corporate team bonding or a fun night out with friends.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent-blue">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Pro Turf</h4>
                    <p className="text-white/40 text-xs">High-quality grass</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent-pink">
                    <Users size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">6v6 Ready</h4>
                    <p className="text-white/40 text-xs">Perfect for teams</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full xl:w-1/2"
          >
            <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-purple/10 blur-[60px] rounded-full" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Book Your Slot</h3>
                  <p className="text-white/40 text-sm flex items-center gap-2">
                    <Calendar size={14} /> Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm">
                  ₹800/hr
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {slots.map((slot) => (
                  <div 
                    key={slot.id}
                    onClick={() => handleBookingClick(slot)}
                    className={`p-4 rounded-2xl flex items-center justify-between transition-all ${
                      slot.status === "Available" 
                        ? "glass border-white/5 hover:border-accent-purple/40 cursor-pointer group" 
                        : "opacity-40 bg-white/5 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Clock size={18} className={slot.status === "Available" ? "text-accent-purple" : "text-white/20"} />
                      <span className="text-white font-medium">{slot.time}</span>
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${
                      slot.status === "Available" ? "text-accent-purple" : "text-white/40"
                    }`}>
                      {slot.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center text-white/40 text-xs font-bold uppercase tracking-widest">
                Select an available slot to book
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSlots(getStoreData().slots); // Refresh slots
        }}
        type="cricket"
        slotId={selectedSlot?.id}
        slotTime={selectedSlot?.time}
      />
    </section>
  );
}
