"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (email === "hpverse@gmail.com" && password === "admin123") {
        localStorage.setItem("m24_admin_auth", "true");
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 via-transparent to-accent-pink/10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gradient mb-2">M24 Admin</h1>
          <p className="text-white/40 font-medium">Meddys 24 Cafe Management Portal</p>
        </div>

        <div className="glass-dark p-8 md:p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white/60 text-sm font-bold mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-accent-purple transition-colors">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hpverse@gmail.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white/60 text-sm font-bold mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-white/20 group-focus-within:text-accent-purple transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/50 transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-accent-pink text-sm font-medium bg-accent-pink/10 p-3 rounded-xl border border-accent-pink/20"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-bold text-lg shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-white/20 text-xs uppercase tracking-[0.3em]">
          Authorized Personnel Only
        </p>
      </motion.div>
    </div>
  );
}
