"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Trophy, 
  Phone, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  Search,
  Filter,
  Trash2
} from "lucide-react";
import { getStoreData, updateBookingStatus, deleteBooking, Booking } from "@/lib/store";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | "table" | "cricket">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setBookings(getStoreData().bookings);
  }, []);

  const handleStatusChange = (id: string, status: Booking["status"]) => {
    const newBookings = updateBookingStatus(id, status);
    setBookings(newBookings);
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to delete this booking record?")) {
      const newBookings = deleteBooking(id);
      setBookings(newBookings);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === "all" || b.type === filter;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search);
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "pending": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "cancelled": return "text-red-400 bg-red-400/10 border-red-400/20";
      default: return "text-white/40 bg-white/5 border-white/5";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {["all", "table", "cricket"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
                filter === f 
                  ? "bg-accent-purple text-white shadow-lg shadow-accent-purple/20" 
                  : "glass text-white/40 hover:text-white/80 border-white/5"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/40 transition-all w-full md:w-80"
            />
          </div>
          <button className="p-3 rounded-2xl glass border border-white/5 text-white/40 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Bookings Table/Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-dark p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center gap-8 group hover:border-white/10 transition-all"
          >
            {/* Type Icon */}
            <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center shrink-0 shadow-2xl ${
              booking.type === 'cricket' ? 'bg-accent-purple/10 text-accent-purple' : 'bg-accent-blue/10 text-accent-blue'
            }`}>
              {booking.type === 'cricket' ? <Trophy size={28} /> : <Users size={28} />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-black text-white truncate">{booking.name}</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-white/40 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-accent-purple" />
                  {booking.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-accent-blue" />
                  {booking.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent-pink" />
                  {booking.time}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-accent-purple" />
                  {booking.guests} Guests
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {booking.status !== 'confirmed' && (
                <button 
                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                  className="p-3 rounded-xl bg-green-400/10 text-green-400 hover:bg-green-400 hover:text-white transition-all border border-green-400/20"
                  title="Confirm"
                >
                  <CheckCircle2 size={20} />
                </button>
              )}
              {booking.status !== 'cancelled' && (
                <button 
                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                  className="p-3 rounded-xl bg-red-400/10 text-red-400 hover:bg-red-400 hover:text-white transition-all border border-red-400/20"
                  title="Cancel"
                >
                  <XCircle size={20} />
                </button>
              )}
              {booking.status !== 'pending' && (
                <button 
                  onClick={() => handleStatusChange(booking.id, 'pending')}
                  className="p-3 rounded-xl bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-white transition-all border border-yellow-400/20"
                  title="Mark Pending"
                >
                  <AlertCircle size={20} />
                </button>
              )}
              <div className="w-px h-10 bg-white/5 mx-2" />
              <button 
                onClick={() => handleDeleteBooking(booking.id)}
                className="p-3 rounded-xl glass border border-white/5 text-red-400/40 hover:text-red-400 transition-all"
                title="Delete Record"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredBookings.length === 0 && (
          <div className="text-center py-24 glass-dark rounded-[3rem] border border-white/5 border-dashed">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/20">
              <Search size={40} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Bookings Found</h3>
            <p className="text-white/40 font-medium">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
