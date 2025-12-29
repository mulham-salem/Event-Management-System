import React from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, ArrowRight } from "lucide-react";
import { StarRating } from "../rating/StarRating";
import type { VenueItem } from "../../api/venues";

interface VenueCardProps {
  venue: VenueItem;
  onSelect?: (id: string) => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onSelect }) => {
  // get cover image only
  const coverImage = venue.images.find((img) => img.is_cover);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="
        group overflow-hidden rounded-2xl
        border border-gray-200 bg-white shadow-sm
        transition-all hover:border-[#5a2ea6] hover:shadow-md
      "
    >
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {coverImage ? (
          <img
            src={coverImage.image_url}
            alt={coverImage.alt_text}
            className="
              h-full w-full object-cover
              transition-transform duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <h3
          className="
            mb-2 line-clamp-1
            font-nata-sans-bd text-lg text-gray-800
            transition group-hover:text-[#5a2ea6]
          "
        >
          {venue.name}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 whitespace-nowrap font-nata-sans-rg text-sm text-gray-600">
          {venue.description}
        </p>

        {/* Capacity */}
        <div className="mb-2 flex items-center gap-2 font-nata-sans-md text-sm text-gray-500">
          <Users size={17} className="text-[#5a2ea6]" />
          <span>{venue.capacity} people</span>
        </div>

        {/* Price */}
        <div className="mb-4 flex items-center gap-2 font-nata-sans-md text-sm text-gray-500">
          <DollarSign size={17} className="text-[#5a2ea6]" />
          <span>{venue.price_per_hour} / hour</span>
        </div>

        {/* Rating */}
        <div className="mb-4 flex items-center justify-between rounded-xl bg-[#f6f4fa] px-3 py-2 font-nata-sans-md shadow-sm">
          {/* Stars + Value */}
          <div className="flex items-center gap-2">
            <StarRating
              rating={venue.average_rating.average_rating}
              showValue={true}
            />
          </div>

          {/* Participants */}
          <div className="flex items-center gap-1 rounded-lg bg-[#f0e9fa] px-2 py-1 text-sm text-gray-500 shadow-inner">
            <Users size={16} className="text-[#5a2ea6]" />
            <span>{venue.average_rating.count}</span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => onSelect?.(venue.id)}
          className="
            inline-flex items-center gap-1
            font-nata-sans-md text-sm text-[#5a2ea6]
            transition hover:text-purple-700
          "
        >
          View Details
          <ArrowRight
            size={16}
            className="transition group-hover:translate-x-1"
          />
        </button>
      </div>
    </motion.div>
  );
};
