"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UtensilsCrossed, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Check,
  X,
  IndianRupee,
  Search,
  Loader2,
  Image as ImageIcon,
  Star,
  AlignLeft
} from "lucide-react";
import { getStoreData, updateMenuItem, addMenuItem, deleteMenuItem, MenuItem } from "@/lib/store";

export default function AdminMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState<"all" | "drinks" | "food" | "snacks">("all");
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    price: string;
    category: "drinks" | "food" | "snacks";
    image: string;
    available: boolean;
    description: string;
    rating: number;
  }>({
    name: "",
    price: "",
    category: "drinks",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1970&auto=format&fit=crop",
    available: true,
    description: "",
    rating: 4.5
  });

  useEffect(() => {
    setMenu(getStoreData().menu);
  }, []);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newMenu = addMenuItem({
      ...formData,
      rating: Number(formData.rating)
    });
    setMenu(newMenu);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    const newMenu = updateMenuItem({
      ...editingItem,
      ...formData,
      rating: Number(formData.rating)
    });
    setMenu(newMenu);
    setEditingItem(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "drinks",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1970&auto=format&fit=crop",
      available: true,
      description: "",
      rating: 4.5
    });
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const newMenu = deleteMenuItem(id);
      setMenu(newMenu);
    }
  };

  const toggleAvailability = (id: string) => {
    const item = menu.find(m => m.id === id);
    if (item) {
      const updated = { ...item, available: !item.available };
      const newMenu = updateMenuItem(updated);
      setMenu(newMenu);
    }
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      available: item.available,
      description: item.description,
      rating: item.rating
    });
  };

  const filteredMenu = menu.filter(m => {
    const matchesFilter = filter === "all" || m.category === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {(["all", "drinks", "food", "snacks"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
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
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-white/10 focus:outline-none focus:border-accent-purple/40 transition-all w-full md:w-64"
            />
          </div>
          <button 
            onClick={() => { resetForm(); setIsAddModalOpen(true); }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-accent-purple hover:text-white transition-all shadow-xl"
          >
            <Plus size={18} />
            New Item
          </button>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMenu.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`glass-dark p-4 rounded-[2.5rem] border border-white/5 group hover:border-white/10 transition-all ${!item.available ? 'opacity-60' : ''}`}
          >
            <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative mb-6">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => toggleAvailability(item.id)}
                  className="p-3 rounded-xl glass border border-white/20 text-white hover:bg-white/20 transition-all"
                  title={item.available ? "Hide from Menu" : "Show on Menu"}
                >
                  {item.available ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <button 
                  onClick={() => openEditModal(item)}
                  className="p-3 rounded-xl glass border border-white/20 text-white hover:bg-accent-purple hover:text-white transition-all"
                >
                  <Edit3 size={20} />
                </button>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-3 rounded-xl glass border border-white/20 text-red-400 hover:bg-red-400 hover:text-white transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              {!item.available && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4">
                  <span className="px-4 py-2 rounded-xl glass border border-white/20 text-white font-black text-xs uppercase tracking-widest">Hidden</span>
                  <button 
                    onClick={() => toggleAvailability(item.id)}
                    className="px-4 py-2 rounded-xl bg-accent-purple text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent-purple/20 hover:scale-105 transition-all"
                  >
                    Show on Menu
                  </button>
                </div>
              )}
            </div>

            <div className="px-2 pb-2">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-accent-purple uppercase tracking-[0.2em]">{item.category}</span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                  <Star size={10} className="text-accent-purple fill-accent-purple" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.rating}</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-2 truncate">{item.name}</h3>
              <p className="text-white/40 text-xs mb-6 line-clamp-2 min-h-[32px]">{item.description}</p>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-black text-white">₹{item.price}</p>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {item.available ? 'Live' : 'Hidden'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingItem) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl glass-dark rounded-[2.5rem] border border-white/10 p-8 md:p-10 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <h2 className="text-3xl font-black text-white mb-8">
                {isAddModalOpen ? 'Add New Item' : 'Edit Item'}
              </h2>
              <form onSubmit={isAddModalOpen ? handleAddItem : handleUpdateItem} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Item Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as "drinks" | "food" | "snacks" })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all appearance-none"
                    >
                      <option value="drinks">Drinks</option>
                      <option value="food">Food</option>
                      <option value="snacks">Snacks</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Price (₹)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Rating</label>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        required
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Description</label>
                  <div className="relative">
                    <AlignLeft className="absolute left-4 top-4 text-white/20" size={18} />
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all resize-none"
                      placeholder="Describe the item..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/60 text-xs font-black uppercase tracking-widest ml-1">Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                    <input
                      type="url"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-accent-purple/50 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                    className="flex-1 py-4 rounded-2xl glass border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-black uppercase tracking-widest shadow-xl shadow-accent-purple/20 hover:scale-[1.02] transition-transform"
                  >
                    {isAddModalOpen ? 'Add Item' : 'Update Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
