import React from "react";
import { motion } from "framer-motion";

export const EventsHeader: React.FC = () => {
  return (
    <header className="relative flex h-screen w-full flex-col items-center  justify-center overflow-hidden text-center text-white"
            style={{
              backgroundImage: "url('/images/gradient_15.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
    >

      <div className="absolute inset-0 z-0 bg-black/40"></div>

      {/* ===== Background Floating Images ===== */}
      <motion.img
        src="/images/event_5.webp"
        alt="event.webp"
        initial={{ opacity: 0, scale: 0.8, x: -120, y: "-50%", rotate: -10, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, scale: 1, x: 0, y: "-50%", rotate: -4, filter: "blur(4px)" }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 0.9, 
        }}
        className="absolute left-[40px] top-[50%]  z-10 h-[342px] w-[500px] rounded-2xl border-2 border-[#b38ff0]"
      />

      <motion.img
        src="/images/event_3.webp"
        alt="event.webp"
        initial={{ opacity: 0, scale: 0.8, x: 120, y: "-50%", rotate: 10, filter: "blur(8px)" }}
        animate={{ opacity: 0.9, scale: 1, x: 0, y: "-50%", rotate: 4, filter: "blur(4px)" }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
          delay: 0.9, 
        }}
        className="absolute right-[40px] top-[50%]  z-10 h-[342px] w-[500px] rounded-2xl border-2 border-[#b38ff0]"
      />

      {/* ===== Title ===== */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="animate-gradient-x relative z-10 mb-6 bg-gradient-to-r from-[#8562c2] via-[#d2c0fb] to-[#da327e]
        bg-clip-text font-nata-sans-eb text-4xl tracking-wide text-transparent sm:text-7xl sm:leading-tight"
      >
        Upcoming Events
      </motion.h2>

      {/* ===== Subtitle ===== */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="relative z-10 mx-auto max-w-2xl font-nata-sans-md text-lg leading-relaxed text-white/90 sm:text-xl"
      >
        Discover cultural experiences, exhibitions, workshops, and vibrant
        community activities - all organized and easy to explore.
      </motion.p>
    </header>
  );
};
