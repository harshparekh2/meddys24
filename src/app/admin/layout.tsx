"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  CalendarCheck, 
  Trophy, 
  LogOut, 
  Menu as MenuIcon, 
  X,
  Bell,
  Settings,
  ChevronRight,
  User,
  ExternalLink,
  Globe
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin", siteHref: "/", color: "text-accent-purple" },
  { icon: CalendarCheck, label: "Table Bookings", href: "/admin/bookings", siteHref: "/#contact", color: "text-accent-blue" },
  { icon: UtensilsCrossed, label: "Menu Editor", href: "/admin/menu", siteHref: "/#menu", color: "text-accent-pink" },
  { icon: Trophy, label: "Box Cricket", href: "/admin/cricket", siteHref: "/#cricket", color: "text-accent-purple" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin/login") return;

    const auth = localStorage.getItem("m24_admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("m24_admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;
  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-2xl glass border border-white/10 text-white shadow-2xl"
      >
        <MenuIcon size={24} />
      </button>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 w-80 bg-[#080808] border-r border-white/5 z-[70] transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/admin" className="text-3xl font-black text-gradient">M24 Admin</Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/40 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <a 
            href="/" 
            className="flex items-center gap-3 p-4 mb-8 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-accent-purple hover:text-white transition-all shadow-xl shadow-white/5"
          >
            <Globe size={18} />
            Main Website
          </a>

          <nav className="flex-1 space-y-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <div className="flex flex-col gap-1 w-full">
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                      isActive 
                        ? "bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
                        : "text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl bg-white/5 ${isActive ? item.color : "text-inherit"}`}>
                        <Icon size={20} />
                      </div>
                      <span className="font-bold tracking-wide">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    )}
                  </Link>
                  <a 
                    href={item.siteHref}
                    className="flex items-center gap-2 px-4 py-1 text-[10px] font-bold text-white/20 hover:text-accent-purple transition-colors ml-12"
                  >
                    <ExternalLink size={10} />
                    View on Website
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="pt-8 mt-8 border-t border-white/5 space-y-4">
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-white/40 hover:text-white transition-all">
              <Settings size={20} />
              <span className="font-bold tracking-wide">Settings</span>
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-accent-pink/60 hover:text-accent-pink hover:bg-accent-pink/10 transition-all border border-transparent hover:border-accent-pink/20"
            >
              <LogOut size={20} />
              <span className="font-bold tracking-wide">Sign Out</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Header */}
        <header className="h-24 px-8 lg:px-12 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-50">
          <div className="hidden lg:block">
            <h2 className="text-xl font-bold tracking-wide">
              {sidebarItems.find(item => item.href === pathname)?.label || "Dashboard"}
            </h2>
            <p className="text-white/20 text-xs font-medium uppercase tracking-[0.2em] mt-1">Meddys 24 Cafe System</p>
          </div>

          <div className="flex items-center gap-6 ml-auto lg:ml-0">
            <a 
              href="/" 
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest"
            >
              <Globe size={14} />
              Visit Site
            </a>

            <button className="p-3 rounded-2xl glass border border-white/5 text-white/40 hover:text-white transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent-pink border-2 border-[#050505]" />
            </button>
            
            <div className="h-10 w-px bg-white/5 mx-2 hidden sm:block" />

            <div className="flex items-center gap-4 p-2 pl-4 rounded-2xl glass border border-white/10 group cursor-pointer hover:border-white/20 transition-all">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-white group-hover:text-accent-purple transition-colors">Admin User</p>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Manager</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-purple to-accent-pink p-[1px]">
                <div className="w-full h-full rounded-xl bg-[#080808] flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 lg:p-12">
          {children}
        </div>

        {/* Background Accents */}
        <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed -top-24 -left-24 w-96 h-96 bg-accent-pink/5 rounded-full blur-[120px] pointer-events-none" />
      </main>
    </div>
  );
}
