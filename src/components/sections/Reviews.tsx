"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Aman Shah",
    role: "Regular Visitor",
    text: "The best aesthetic cafe in Ahmedabad! The neon vibe and the Box Cricket experience are unmatched. Highly recommend the Purple Haze Mocktail.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=aman"
  },
  {
    name: "Priya Patel",
    role: "Food Blogger",
    text: "Meddys 24 has the most instagrammable corners. Every spot is a photo op. The Meddys Signature Burger is a must-try!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=priya"
  },
  {
    name: "Rahul Mehta",
    role: "Box Cricket Fan",
    text: "Played 2 hours of Box Cricket and then had the best Truffle Fries ever. The vibe here is so energetic and premium.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=rahul"
  },
  {
    name: "Sneha Gupta",
    role: "Graphic Designer",
    text: "Love the dark theme and the neon lighting. It feels so high-end. Perfect place for a late-night hangout with friends.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sneha"
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Guests Say</span>
          </h2>
          <p className="text-white/40 text-lg font-light max-w-xl mx-auto">
            Real experiences from the Meddys 24 community.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white/20 !w-3 !h-3",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-accent-purple !w-8 !rounded-full transition-all duration-300",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="!pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="glass p-10 rounded-[2.5rem] border border-white/10 h-full relative group hover:border-accent-purple/40 transition-all duration-500">
                <Quote className="absolute top-8 right-8 text-white/5 w-16 h-16 group-hover:text-accent-purple/10 transition-colors" />
                
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "text-accent-purple fill-accent-purple" : "text-white/10 fill-white/10"} 
                    />
                  ))}
                </div>

                <p className="text-white/80 text-lg mb-8 leading-relaxed italic font-light">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{review.name}</h4>
                    <p className="text-white/40 text-sm font-medium">{review.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
