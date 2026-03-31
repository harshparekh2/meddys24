"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Info Side */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Find Your Way To <br />
                <span className="text-gradient">The Best Vibe</span>
              </h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent-purple shrink-0">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Our Location</h4>
                    <p className="text-white/40 leading-relaxed max-w-sm">
                      Meddys 24 Cafe, Sindhu Bhavan Road, Ahmedabad, Gujarat 380054
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent-blue shrink-0">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Open Hours</h4>
                    <p className="text-white/40 leading-relaxed">
                      Everyday: 11:00 AM - 04:00 AM
                    </p>
                    <p className="text-accent-blue text-xs font-bold uppercase tracking-widest mt-1">
                      Late Night Hotspot
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://wa.me/919876543210" 
                  target="_blank"
                  className="flex-1 px-8 py-5 rounded-3xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                >
                  <MessageCircle size={24} />
                  WhatsApp Us
                </a>
                <a 
                  href="tel:+919876543210" 
                  className="flex-1 px-8 py-5 rounded-3xl glass border border-white/10 text-white font-bold flex items-center justify-center gap-3 hover:bg-white/5 transition-all"
                >
                  <Phone size={24} className="text-accent-purple" />
                  Call Now
                </a>
              </div>
            </motion.div>
          </div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="glass-dark p-3 rounded-[3rem] border border-white/10 relative overflow-hidden aspect-video md:aspect-square">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.6979213898!2d72.50058!3d23.03385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd67000000000!2sSindhu%20Bhavan%20Road%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1711880000000!5m2!1sen!2sin" 
                className="w-full h-full rounded-[2.5rem] border-0 grayscale invert opacity-70 contrast-125"
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-8 right-8">
                <div className="glass p-4 rounded-2xl flex items-center gap-2 text-white font-bold text-sm">
                  Open in Maps <ExternalLink size={16} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
