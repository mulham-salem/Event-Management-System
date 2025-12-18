import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { EventItem } from "../../api/events";

interface EventCardProps {
  event: EventItem;
  onSelect?: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-[#5a2ea6] hover:shadow-md"
    >
      {/* Title */}
      <h3 className="mb-2 line-clamp-1 font-nata-sans-bd text-lg text-gray-800 transition group-hover:text-[#5a2ea6]">
        {event.title}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-2 font-nata-sans-rg text-sm text-gray-600">
        {event.description}
      </p>

      {/* Date */}
      <div className="mb-2 flex items-center gap-2 font-nata-sans-md text-sm text-gray-500">
        <Calendar size={17} className="text-[#5a2ea6]" />
        <span>{event.date}</span>
      </div>

      {/* Time */}
      <div className="mb-4 flex items-center gap-2 font-nata-sans-md text-sm text-gray-500">
        <Clock size={17} className="text-[#5a2ea6]" />
        <span>
          {event.start_time} — {event.end_time}
        </span>
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect?.(event.id)}
        className="inline-flex items-center gap-1 font-nata-sans-md text-sm text-[#5a2ea6] transition hover:text-purple-700"
      >
        View Details
        <ArrowRight
          size={16}
          className="transition group-hover:translate-x-1"
        />
      </button>
    </motion.div>
  );
};
