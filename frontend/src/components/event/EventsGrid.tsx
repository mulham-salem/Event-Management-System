import React from "react";
import { motion } from "framer-motion";
import type { EventItem } from "../../api/events";
import { EventCard } from "./EventCard";

interface EventsGridProps {
  events?: EventItem[];
  onSelect?: (id: string) => void;
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events, onSelect }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="grid grid-cols-1 gap-6 px-4 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {events?.map((event) => (
        <motion.div
          key={event.id}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-[300px]"
        >
          <EventCard event={event} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
};
