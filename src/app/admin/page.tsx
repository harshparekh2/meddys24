"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UtensilsCrossed, 
  Trophy, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  Calendar,
  IndianRupee
} from "lucide-react";
import { getStoreData } from "@/lib/store";

export default function AdminOverview() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData(getStoreData());
  }, []);

  if (!data) return null;

  const stats = [
    { 
      label: "Total Bookings", 
      value: data.bookings.length, 
      change: "+12%", 
      icon: Users, 
      color: "text-accent-purple",
      bg: "bg-accent-purple/10"
    },
    { 
      label: "Today's Revenue", 
      value: "₹12,450", 
      change: "+8.4%", 
      icon: IndianRupee, 
      color: "text-accent-blue",
      bg: "bg-accent-blue/10"
    },
    { 
      label: "Menu Items", 
      value: data.menu.length, 
      change: "Active", 
      icon: UtensilsCrossed, 
      color: "text-accent-pink",
      bg: "bg-accent-pink/10"
    },
    { 
      label: "Cricket Slots", 
      value: data.slots.filter((s: any) => s.status === "Booked").length + "/" + data.slots.length, 
      change: "Booked", 
      icon: Trophy, 
      color: "text-accent-purple",
      bg: "bg-accent-purple/10"
    },
  ];

  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark p-6 rounded-[2rem] border border-white/5 relative group hover:border-white/10 transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.change}</span>
                  <ArrowUpRight size={14} className="text-accent-purple" />
                </div>
              </div>
              <h3 className="text-white/40 text-sm font-bold uppercase tracking-[0.15em] mb-1">{stat.label}</h3>
              <p className="text-3xl font-black text-white">{stat.value}</p>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-accent-purple/5 to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark p-10 rounded-[2.5rem] border border-white/10"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Recent Activity</h3>
              <p className="text-white/40 text-sm font-medium">Real-time cafe operations</p>
            </div>
            <button className="text-accent-purple font-bold text-sm hover:underline">View All</button>
          </div>

          <div className="space-y-6">
            {data.bookings.map((booking: any, index: number) => (
              <div key={booking.id} className="flex items-center gap-6 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  booking.type === 'cricket' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-accent-blue/10 text-accent-blue'
                }`}>
                  {booking.type === 'cricket' ? <Trophy size={20} /> : <Users size={20} />}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold">{booking.name}</h4>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{booking.type} Booking • {booking.guests} Guests</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-black text-sm">{booking.time}</p>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Cafe Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-dark p-10 rounded-[2.5rem] border border-white/10"
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Cafe Status</h3>
              <p className="text-white/40 text-sm font-medium">Live status and occupancy</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20">
              <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-accent-purple text-xs font-black uppercase tracking-widest">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-accent-blue">
                <Clock size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Peak Time</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">09:00 PM</p>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Expected today</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center gap-3 text-accent-pink">
                <TrendingUp size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Popularity</span>
              </div>
              <div>
                <p className="text-2xl font-black text-white">94%</p>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Guest satisfaction</p>
              </div>
            </div>
            <div className="col-span-2 p-8 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="space-y-2">
                <h4 className="text-white font-bold">Box Cricket Arena</h4>
                <p className="text-white/40 text-sm font-medium">Currently in match (45 mins left)</p>
              </div>
              <div className="px-6 py-3 rounded-2xl bg-accent-purple text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-accent-purple/20">
                Active
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
