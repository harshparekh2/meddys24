"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-background flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full border-t-2 border-accent-purple animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-gradient"
              >
                M24
              </motion.span>
            </div>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-white/40 text-sm tracking-[0.3em] uppercase"
          >
            Meddys 24 Cafe
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
