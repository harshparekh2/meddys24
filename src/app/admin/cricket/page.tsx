"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  IndianRupee,
  MoreVertical,
  Plus,
  RefreshCw,
  Search
} from "lucide-react";
import { getStoreData, updateCricketSlot, CricketSlot } from "@/lib/store";

export default function AdminCricket() {
  const [slots, setSlots] = useState<CricketSlot[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setSlots(getStoreData().slots);
  }, []);

  const handleStatusToggle = (id: string) => {
    const slot = slots.find(s => s.id === id);
    if (slot) {
      const updated = { ...slot, status: slot.status === "Available" ? "Booked" : "Available" as any };
      const newSlots = updateCricketSlot(updated);
      setSlots(newSlots);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSlots(getStoreData().slots);
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 px-6 py-3 rounded-2xl glass border border-white/10">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-black text-white uppercase tracking-widest">Arena Live</span>
          </div>
          <button 
            onClick={handleRefresh}
            className={`p-3 rounded-2xl glass border border-white/5 text-white/40 hover:text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search slots..."
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/40 transition-all w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-accent-purple hover:text-white transition-all shadow-xl">
            <Plus size={18} />
            Add Slot
          </button>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {slots.map((slot, index) => (
          <motion.div
            key={slot.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-dark p-8 rounded-[2.5rem] border border-white/5 group hover:border-white/10 transition-all relative overflow-hidden ${slot.status === 'Booked' ? 'opacity-70' : ''}`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-tr ${slot.status === 'Available' ? 'from-green-400/5' : 'from-accent-purple/5'} to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />

            <div className="flex items-center justify-between mb-8">
              <div className={`p-4 rounded-2xl ${slot.status === 'Available' ? 'bg-green-400/10 text-green-400' : 'bg-accent-purple/10 text-accent-purple'}`}>
                <Trophy size={28} />
              </div>
              <button className="p-3 rounded-xl glass border border-white/5 text-white/20 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-white/20" />
                <h3 className="text-xl font-black text-white tracking-tight">{slot.time}</h3>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <IndianRupee size={16} className="text-accent-purple" />
                  <span className="text-2xl font-black text-white tracking-tight">₹{slot.price}</span>
                  <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">/hr</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleStatusToggle(slot.id)}
                className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all border ${
                  slot.status === 'Available' 
                    ? 'bg-green-400/10 text-green-400 border-green-400/20 hover:bg-green-400 hover:text-white' 
                    : 'bg-white/5 text-white/40 border-white/5 hover:bg-accent-purple/10 hover:text-accent-purple hover:border-accent-purple/20'
                }`}
              >
                {slot.status === 'Available' ? 'Mark Booked' : 'Make Available'}
              </button>
              
              <div className={`px-4 py-4 rounded-2xl border flex items-center justify-center ${
                slot.status === 'Available' ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-accent-purple bg-accent-purple/10 border-accent-purple/20'
              }`}>
                {slot.status === 'Available' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arena Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-dark p-10 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-12 mt-12 overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-black text-white mb-2">Arena Maintenance</h3>
          <p className="text-white/40 font-medium max-w-sm">Schedule arena closure or update maintenance status for players.</p>
        </div>

        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl glass border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
            View Schedule
          </button>
          <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-accent-pink text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-accent-pink/20 hover:scale-[1.02] transition-transform">
            Close Arena
          </button>
        </div>
      </motion.div>
    </div>
  );
}
