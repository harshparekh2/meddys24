"use client";

import { motion } from "framer-motion";
import { Sparkles, Moon, Users } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "Premium Ambiance",
    desc: "Designed with luxury and comfort in mind, our space is perfect for your next aesthetic post.",
    color: "text-accent-purple"
  },
  {
    icon: Moon,
    title: "Late-Night Vibe",
    desc: "The city never sleeps, and neither do we. Experience the best nightlife atmosphere in Ahmedabad.",
    color: "text-accent-blue"
  },
  {
    icon: Users,
    title: "Youth Hotspot",
    desc: "The ultimate hangout for Gen-Z to connect, eat, and play in a vibrant community.",
    color: "text-accent-pink"
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                More Than Just <br />
                <span className="text-gradient">A Cafe Experience</span>
              </h2>
              <p className="text-white/60 text-lg mb-10 leading-relaxed font-light">
                Meddys 24 Cafe isn't just a place to grab a coffee; it's a lifestyle destination. 
                Born in the heart of Ahmedabad, we've created a sanctuary for the dreamers, 
                the doers, and the late-night seekers. From premium gourmet bites to our 
                exclusive box cricket arena, every corner is designed to be instagrammable 
                and every moment is meant to be shared.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass p-6 rounded-2xl flex items-start gap-4 border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass p-2 border border-white/10">
              <div 
                className="w-full h-full rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop')` }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-purple/30 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-blue/30 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
