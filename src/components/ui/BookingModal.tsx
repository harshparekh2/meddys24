"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, Phone, User, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { addBooking } from "@/lib/store";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "table" | "cricket";
  slotId?: string;
  slotTime?: string;
}

export default function BookingModal({ isOpen, onClose, type, slotId, slotTime }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: type === "table" ? 2 : 6,
    date: new Date().toISOString().split("T")[0],
    time: slotTime || "07:00 PM",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      addBooking({
        name: formData.name,
        phone: formData.phone,
        guests: Number(formData.guests),
        date: formData.date,
        time: formData.time,
        type,
        slotId,
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          phone: "",
          guests: type === "table" ? 2 : 6,
          date: new Date().toISOString().split("T")[0],
          time: slotTime || "07:00 PM",
        });
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white mb-1">
                    {type === "table" ? "Book a Table" : "Book Cricket Slot"}
                  </h2>
                  <p className="text-white/40 text-sm font-medium">Secure your spot at Meddys 24</p>
                </div>
                <button onClick={onClose} className="p-3 rounded-2xl glass border border-white/5 text-white/40 hover:text-white transition-all">
                  <X size={24} />
                </button>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-400/10 text-green-400 flex items-center justify-center mx-auto mb-6 border border-green-400/20 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Booking Requested!</h3>
                  <p className="text-white/40 font-medium">Our team will confirm your booking shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Your Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Phone Number</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="98765 43210"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">No. of Guests</label>
                      <div className="relative group">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
                        <input
                          type="number"
                          required
                          min="1"
                          max={type === "cricket" ? "20" : "12"}
                          value={formData.guests}
                          onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Date</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
                        <input
                          type="date"
                          required
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                        />
                      </div>
                    </div>

                    {type === "table" && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Preferred Time</label>
                        <div className="relative group">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={18} />
                          <select
                            required
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent-purple/50 transition-all appearance-none"
                          >
                            <option value="07:00 PM">07:00 PM</option>
                            <option value="07:30 PM">07:30 PM</option>
                            <option value="08:00 PM">08:00 PM</option>
                            <option value="08:30 PM">08:30 PM</option>
                            <option value="09:00 PM">09:00 PM</option>
                            <option value="09:30 PM">09:30 PM</option>
                            <option value="10:00 PM">10:00 PM</option>
                            <option value="11:00 PM">11:00 PM</option>
                            <option value="12:00 AM">12:00 AM</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {type === "cricket" && (
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Selected Slot</label>
                        <div className="p-4 rounded-2xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple font-bold flex items-center gap-3">
                          <Clock size={18} />
                          {slotTime}
                        </div>
                      </div>
                    )}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 rounded-2xl bg-red-400/10 border border-red-400/20 text-red-400 text-sm font-medium flex items-center gap-3"
                    >
                      <AlertCircle size={18} />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-accent-purple to-accent-pink text-white font-black text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
