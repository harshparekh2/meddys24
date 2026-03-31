"use client";

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: "drinks" | "food" | "snacks";
  image: string;
  available: boolean;
  description: string;
  rating: number;
}

export interface Booking {
  id: string;
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  type: "table" | "cricket";
  status: "confirmed" | "pending" | "cancelled";
  slotId?: string; // For cricket bookings
}

export interface CricketSlot {
  id: string;
  time: string;
  status: "Available" | "Booked";
  price: string;
}

const DEFAULT_MENU: MenuItem[] = [
  { 
    id: "1", 
    name: "Neon Blue Latte", 
    price: "240", 
    category: "drinks", 
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1970&auto=format&fit=crop", 
    available: true,
    description: "Our signature vibrant blue latte with a hint of butterfly pea flower and vanilla, topped with a glowing neon foam.",
    rating: 4.8
  },
  { 
    id: "2", 
    name: "Purple Haze Mocktail", 
    price: "280", 
    category: "drinks", 
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=2072&auto=format&fit=crop", 
    available: true,
    description: "A refreshing blend of blackcurrant, lime, and soda with a shimmering purple effect that changes color in the light.",
    rating: 4.9
  },
  { 
    id: "3", 
    name: "Cloud Cold Brew", 
    price: "220", 
    category: "drinks", 
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2070&auto=format&fit=crop", 
    available: true,
    description: "Cold brew coffee steeped for 24 hours, served with a thick layer of sea-salt cream foam for a cloud-like experience.",
    rating: 4.7
  },
  { 
    id: "4", 
    name: "Meddys Signature Burger", 
    price: "350", 
    category: "food", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop", 
    available: true,
    description: "A juicy, flame-grilled patty with melted cheddar, caramelised onions, and our secret Meddys sauce in a toasted brioche bun.",
    rating: 4.9
  },
  { 
    id: "5", 
    name: "Truffle Fries", 
    price: "220", 
    category: "food", 
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1887&auto=format&fit=crop", 
    available: true,
    description: "Crispy golden fries tossed in truffle oil and parmesan cheese, served with a side of garlic aioli.",
    rating: 4.8
  },
  { 
    id: "6", 
    name: "Cheesy Wedges", 
    price: "180", 
    category: "snacks", 
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=2070&auto=format&fit=crop", 
    available: true,
    description: "Thick-cut potato wedges loaded with melted cheese, spring onions, and a dash of paprika.",
    rating: 4.6
  },
];

const DEFAULT_CRICKET_SLOTS: CricketSlot[] = [
  { id: "s1", time: "06:00 PM - 07:00 PM", status: "Booked", price: "800" },
  { id: "s2", time: "07:00 PM - 08:00 PM", status: "Available", price: "800" },
  { id: "s3", time: "08:00 PM - 09:00 PM", status: "Available", price: "800" },
  { id: "s4", time: "09:00 PM - 10:00 PM", status: "Booked", price: "800" },
  { id: "s5", time: "10:00 PM - 11:00 PM", status: "Available", price: "800" },
];

const DEFAULT_BOOKINGS: Booking[] = [
  { id: "b1", name: "Rahul Sharma", phone: "9876543210", guests: 4, date: "2026-03-31", time: "07:00 PM", type: "table", status: "confirmed" },
  { id: "b2", name: "Sneha Patel", phone: "9123456789", guests: 2, date: "2026-03-31", time: "08:30 PM", type: "table", status: "pending" },
  { id: "b3", name: "Ankit Mehta", phone: "9988776655", guests: 8, date: "2026-03-31", time: "06:00 PM - 07:00 PM", type: "cricket", status: "confirmed", slotId: "s1" },
];

export const getStoreData = () => {
  if (typeof window === "undefined") return { menu: DEFAULT_MENU, bookings: DEFAULT_BOOKINGS, slots: DEFAULT_CRICKET_SLOTS };
  
  const menu = JSON.parse(localStorage.getItem("m24_menu") || JSON.stringify(DEFAULT_MENU));
  const bookings = JSON.parse(localStorage.getItem("m24_bookings") || JSON.stringify(DEFAULT_BOOKINGS));
  const slots = JSON.parse(localStorage.getItem("m24_slots") || JSON.stringify(DEFAULT_CRICKET_SLOTS));
  
  return { menu, bookings, slots };
};

// --- MENU ACTIONS ---
export const addMenuItem = (item: Omit<MenuItem, "id">) => {
  const { menu } = getStoreData();
  const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) };
  const newMenu = [...menu, newItem];
  localStorage.setItem("m24_menu", JSON.stringify(newMenu));
  return newMenu;
};

export const updateMenuItem = (updatedItem: MenuItem) => {
  const { menu } = getStoreData();
  const newMenu = menu.map((item: MenuItem) => item.id === updatedItem.id ? updatedItem : item);
  localStorage.setItem("m24_menu", JSON.stringify(newMenu));
  return newMenu;
};

export const deleteMenuItem = (id: string) => {
  const { menu } = getStoreData();
  const newMenu = menu.filter((item: MenuItem) => item.id !== id);
  localStorage.setItem("m24_menu", JSON.stringify(newMenu));
  return newMenu;
};

// --- BOOKING ACTIONS ---
export const addBooking = (booking: Omit<Booking, "id" | "status">) => {
  const { bookings, slots } = getStoreData();
  
  // Prevent double booking for table at the same time and date
  if (booking.type === "table") {
    const isTaken = bookings.some((b: Booking) => 
      b.type === "table" && b.date === booking.date && b.time === booking.time && b.status !== "cancelled"
    );
    if (isTaken) throw new Error("This time slot is already booked for a table. Please choose another time.");
  }

  // Prevent double booking for cricket slots
  if (booking.type === "cricket" && booking.slotId) {
    const slot = slots.find((s: CricketSlot) => s.id === booking.slotId);
    if (!slot || slot.status === "Booked") throw new Error("This cricket slot is already booked.");
    
    // Mark slot as booked
    const newSlots = slots.map((s: CricketSlot) => s.id === booking.slotId ? { ...s, status: "Booked" } : s);
    localStorage.setItem("m24_slots", JSON.stringify(newSlots));
  }

  const newBooking = { ...booking, id: "b" + Math.random().toString(36).substr(2, 9), status: "pending" as const };
  const newBookings = [...bookings, newBooking];
  localStorage.setItem("m24_bookings", JSON.stringify(newBookings));
  return { bookings: newBookings, booking: newBooking };
};

export const updateBookingStatus = (id: string, status: Booking["status"]) => {
  const { bookings, slots } = getStoreData();
  const booking = bookings.find((b: Booking) => b.id === id);
  
  if (booking && status === "cancelled" && booking.type === "cricket" && booking.slotId) {
    // Free up cricket slot if booking is cancelled
    const newSlots = slots.map((s: CricketSlot) => s.id === booking.slotId ? { ...s, status: "Available" } : s);
    localStorage.setItem("m24_slots", JSON.stringify(newSlots));
  }

  const newBookings = bookings.map((b: Booking) => b.id === id ? { ...b, status } : b);
  localStorage.setItem("m24_bookings", JSON.stringify(newBookings));
  return newBookings;
};

export const deleteBooking = (id: string) => {
  const { bookings } = getStoreData();
  const newBookings = bookings.filter((b: Booking) => b.id !== id);
  localStorage.setItem("m24_bookings", JSON.stringify(newBookings));
  return newBookings;
};

// --- CRICKET SLOT ACTIONS ---
export const updateCricketSlot = (updatedSlot: CricketSlot) => {
  const { slots } = getStoreData();
  const newSlots = slots.map((s: CricketSlot) => s.id === updatedSlot.id ? updatedSlot : s);
  localStorage.setItem("m24_slots", JSON.stringify(newSlots));
  return newSlots;
};
