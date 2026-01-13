import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  DollarSign,
  LogIn,
  CheckCircle,
  Phone,
  User,
  Notebook,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { getToken } from "../../utils/authToken";
import { getRole } from "../../utils/authRole";
import { BookingForm } from "../booking/BookingForm";
import { ModalPortal } from "../common/ModalPortal";
import { RatingsSection } from "../rating/RatingsSection";
import type { VenueDetails } from "../../api/venues";
import { useLocation } from "react-router-dom";

interface VenueCardDetailsProps {
  venue: VenueDetails;
  onBack: () => void;
}

export const VenueCardDetails: React.FC<VenueCardDetailsProps> = ({
  venue,
  onBack,
}) => {
  const location = useLocation();
  const isOrganizer =
    location.pathname === "/organizer/venues" ||
    location.pathname === "/organizer/bookings";

  const [openCreate, setOpenCreate] = useState(false);

  const coverImage =
    venue.images.find((img) => img.is_cover) ?? venue.images[0];

  const accessToken = getToken();
  const role = getRole();

  const isLoggedIn = Boolean(accessToken);
  const isAllowed = role === "client" || role === "organizer";

  const handleBooking = () => {
    if (!isLoggedIn) {
      toast.error("Please login to book this venue");
      return;
    }

    if (!isAllowed) {
      toast.error("Only clients can book venues");
      return;
    }

    setOpenCreate(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mx-auto mb-8 w-full max-w-5xl rounded-3xl bg-white p-8 shadow-xl"
    >
      {/* Back */}
      <button
        onClick={onBack}
        className={`mb-6 inline-flex items-center gap-2 font-nata-sans-md text-sm
                    ${
                      isOrganizer
                        ? "text-amber-600 hover:text-amber-700"
                        : "text-[#5a2ea6] hover:text-purple-700"
                    }`}
      >
        <ArrowLeft size={18} className="transition hover:translate-x-1" />
        Back to venues
      </button>

      {/* Cover Image */}
      {coverImage && (
        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={coverImage.image_url}
            alt={coverImage.alt_text}
            className="h-[320px] w-full object-cover"
          />
        </div>
      )}

      {/* Provider */}
      <div
        className={`mb-6 rounded-2xl ${
          isOrganizer ? "bg-amber-50/50" : "bg-[#f6f1ff]"
        } p-5`}
      >
        <h3
          className={`mb-3 font-nata-sans-bd text-lg ${
            isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"
          }`}
        >
          Provider
        </h3>

        <div className="flex flex-wrap gap-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>Name: {venue.provider.full_name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>Email: {venue.provider.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>Phone: {venue.provider.phone ?? "0000000000"}</span>
          </div>
        </div>
      </div>

      {/* Venue Info */}
      <div className="mb-8">
        <h3 className="mb-4 font-nata-sans-bd text-lg text-gray-800">
          Venue Details
        </h3>

        <div className="mb-4 flex flex-wrap gap-6 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Notebook
              size={16}
              className={`${isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"}`}
            />
            <span>{venue.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users
              size={16}
              className={`${isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"}`}
            />
            <span>Capacity: {venue.capacity}</span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign
              size={17}
              className={`${isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"}`}
            />
            <span>Price: {venue.price_per_hour} / hour</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin
              size={16}
              className={`${isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"}`}
            />
            <span>
              Location: {venue.location_geo.area}, {venue.location_geo.city}
            </span>
          </div>
        </div>

        {/* Map */}
        {venue.location_geo && (
          <>
            <div className="mb-6 overflow-hidden rounded-2xl border">
              <iframe
                title="Venue location"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  venue.location_geo.location
                )}&output=embed`}
                className="h-[300px] w-full border-0"
                loading="lazy"
              />
            </div>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                venue.location_geo.location
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center font-nata-sans-md text-sm ${
                isOrganizer ? "text-amber-600" : "text-[#5a2ea6]"
              } hover:underline`}
            >
              Open in Google Maps
            </a>
          </>
        )}

        {/* Gallery */}
        {venue.images.length > 1 && (
          <div>
            <h3 className="my-4 font-nata-sans-bd text-lg text-gray-800">
              Gallery
            </h3>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {venue.images.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-xl border">
                  <img
                    src={img.image_url}
                    alt={img.alt_text}
                    className="h-32 w-full object-cover transition hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking */}
      <div className="mb-10">
        <h3 className="mb-4 font-nata-sans-bd text-lg text-gray-800">
          Availability Booking
        </h3>

        {venue.bookings.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle size={16} />
            No bookings available
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {venue.bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-xl border border-red-200 
                         bg-red-50 p-4 text-sm text-red-600"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Calendar size={15} />
                  <span>{booking.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  <span>
                    {booking.start_time} — {booking.end_time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isLoggedIn && <RatingsSection targetType="venue" targetId={venue.id} />}

      {/* Action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBooking}
          disabled={isLoggedIn && !isAllowed}
          className={`
            group inline-flex items-center gap-2 rounded-xl px-8 py-3
            font-nata-sans-md text-sm transition-all
            ${
              isLoggedIn && isAllowed
                ? `${
                    isOrganizer
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-[#5a2ea6] hover:bg-purple-800"
                  } text-white active:scale-95`
                : "cursor-not-allowed bg-gray-200 text-gray-500"
            }
          `}
        >
          {!isLoggedIn && (
            <>
              <LogIn size={18} className="transition group-hover:scale-110" />
              Login to book venue
            </>
          )}

          {isLoggedIn && !isAllowed && (
            <>
              <AlertCircle
                size={18}
                className="transition group-hover:scale-110"
              />
              Only clients can book
            </>
          )}

          {isLoggedIn && isAllowed && (
            <>
              <CheckCircle
                size={18}
                className="transition group-hover:scale-110"
              />
              Request Booking
            </>
          )}
        </motion.button>
      </motion.div>

      {/* Creation Modal */}
      <AnimatePresence>
        {openCreate && (
          <ModalPortal>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenCreate(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
              >
                <h3 className="mb-4 text-lg font-semibold">
                  Create New Booking
                </h3>

                <BookingForm
                  venueId={venue.id}
                  onClose={() => setOpenCreate(false)}
                />
              </motion.div>
            </motion.div>
          </ModalPortal>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
