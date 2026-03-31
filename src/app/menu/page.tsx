"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Pizza, IceCream, ArrowLeft, Star, Search, Filter } from "lucide-react";
import { getStoreData, MenuItem } from "@/lib/store";
import MenuItemModal from "@/components/ui/MenuItemModal";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Items", icon: Filter },
  { id: "drinks", label: "Drinks", icon: Coffee },
  { id: "food", label: "Food", icon: Pizza },
  { id: "snacks", label: "Snacks", icon: IceCream },
];

export default function FullMenuPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchSearchQuery] = useState("");

  useEffect(() => {
    setMenuItems(getStoreData().menu);
    
    const handleStorage = () => setMenuItems(getStoreData().menu);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeTab === "all" || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-white pb-32">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-dark border-b border-white/5 px-6 py-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="p-3 rounded-2xl glass border border-white/5 text-white/60 hover:text-white transition-all">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-black text-gradient uppercase tracking-widest">Full Menu</h1>
          <div className="w-12" /> {/* Spacer */}
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Search & Filter Section */}
        <div className="flex flex-col gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group max-w-2xl mx-auto w-full"
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-purple transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for flavors, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-16 pr-8 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/40 transition-all text-lg shadow-2xl shadow-black/50"
            />
          </motion.div>

          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 whitespace-nowrap border ${
                    isActive 
                      ? "bg-accent-purple text-white border-accent-purple/50 shadow-[0_0_30px_rgba(168,85,247,0.3)]" 
                      : "glass text-white/40 border-white/5 hover:border-white/20"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-bold uppercase tracking-widest text-xs">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleItemClick(item)}
                className="group"
              >
                <div className="glass p-4 rounded-[2.5rem] border border-white/10 cursor-pointer hover:border-accent-purple/30 hover:shadow-[0_0_40px_rgba(168,85,247,0.1)] transition-all h-full flex flex-col">
                  <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 relative shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4 px-4 py-2 rounded-xl glass border border-white/20 text-white font-black text-xs uppercase flex items-center gap-2">
                      <Star size={14} className="text-accent-purple fill-accent-purple" />
                      {item.rating}
                    </div>

                    <div className="absolute bottom-6 left-6">
                      <span className="text-white font-black text-2xl tracking-tight">₹{item.price}</span>
                    </div>
                  </div>

                  <div className="px-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-accent-purple uppercase tracking-[0.2em]">{item.category}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-accent-purple transition-colors">{item.name}</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                      {item.description}
                    </p>
                    <div className="mt-auto">
                      <button className="w-full py-4 rounded-2xl glass border border-white/5 text-white/60 font-black text-xs uppercase tracking-widest group-hover:bg-accent-purple group-hover:text-white group-hover:border-accent-purple/50 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 glass-dark rounded-[3rem] border border-white/5 border-dashed"
          >
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-8 text-white/10">
              <Search size={48} />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">No items found</h3>
            <p className="text-white/40 text-lg font-medium">Try searching for something else or change the category.</p>
          </motion.div>
        )}
      </main>

      {/* Modal */}
      <MenuItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />

      {/* Background Accents */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-accent-pink/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
