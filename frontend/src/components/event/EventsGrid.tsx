import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import type { EventItem } from "../../api/events";
import { EventCard } from "./EventCard";
import { ArrowLeft } from "lucide-react";

interface EventsGridProps {
  events?: EventItem[];
  onSelect?: (id: string) => void;
}

export const EventsGrid: React.FC<EventsGridProps> = ({ events, onSelect }) => {
  const location = useLocation();
  const showLink = location.pathname === "/client/events";
  return (
    <>
      {/* Back */}
      {showLink && (
        <Link
          to="/client/registrations"
          className="mb-6 inline-flex items-center gap-2 font-nata-sans-md text-sm text-[#5a2ea6] hover:text-purple-700"
        >
          <ArrowLeft size={18} className="transition hover:translate-x-1" />
          Back to registrations
        </Link>
      )}

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
            className="w-[280px]"
          >
            <EventCard event={event} onSelect={onSelect} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
