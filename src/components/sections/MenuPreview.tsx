"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Pizza, IceCream, ArrowRight, Star } from "lucide-react";
import { getStoreData, MenuItem } from "@/lib/store";
import MenuItemModal from "../ui/MenuItemModal";
import Link from "next/link";

const categories = [
  { id: "drinks", label: "Drinks", icon: Coffee },
  { id: "food", label: "Food", icon: Pizza },
  { id: "snacks", label: "Snacks", icon: IceCream },
];

export default function MenuPreview() {
  const [activeTab, setActiveTab] = useState<"drinks" | "food" | "snacks">("drinks");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMenuItems(getStoreData().menu);
    
    const handleStorage = () => setMenuItems(getStoreData().menu);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredItems = menuItems.filter(item => item.category === activeTab && item.available);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <section id="menu" className="py-24 px-6 bg-black/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Explore Our <span className="text-gradient">Vibey Menu</span>
            </h2>
            <p className="text-white/40 text-lg font-light">Handcrafted flavors for the modern palate.</p>
          </motion.div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive 
                      ? "bg-accent-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]" 
                      : "glass text-white/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-semibold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="min-w-[280px] md:min-w-[320px] lg:min-w-[380px] snap-center"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="glass p-3 rounded-[2rem] border border-white/10 group cursor-pointer hover:border-white/30 transition-all">
                    <div className="aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-4 relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass border border-white/20 text-white font-black text-[10px] uppercase flex items-center gap-1.5">
                        <Star size={10} className="text-accent-purple fill-accent-purple" />
                        {item.rating}
                      </div>

                      <div className="absolute bottom-4 left-4">
                        <span className="text-white font-bold text-xl">₹{item.price}</span>
                      </div>
                    </div>
                    <div className="px-2 pb-2">
                      <h3 className="text-white font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-white/40 text-sm mb-4 line-clamp-1">{item.description}</p>
                      <button className="text-accent-purple font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        View Details <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            href="/menu"
            className="px-10 py-4 rounded-full glass border border-white/10 text-white font-bold hover:bg-white/5 transition-all flex items-center gap-3 group"
          >
            View Full Menu
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <MenuItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </section>
  );
}
