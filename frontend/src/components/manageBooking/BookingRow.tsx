import React from "react";
import { motion } from "framer-motion";
import { Check, X, Ban, Building2 } from "lucide-react";

import type { Bookings } from "../../api/bookingsManage";

/* =======================
   Props
======================= */

interface BookingRowProps {
  booking: Bookings;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
  onCancel: (id: string) => void;
}

/* =======================
   Helpers
======================= */

const statusStyles: Record<Bookings["status"], { bg: string; text: string }> = {
  pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
  approved: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  rejected: {
    bg: "bg-red-100",
    text: "text-red-700",
  },
  canceled: {
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
};

/* =======================
   Component
======================= */

export const BookingRow: React.FC<BookingRowProps> = ({
  booking,
  onAccept,
  onReject,
  onCancel,
}) => {
  const statusConfig = statusStyles[booking.status];

  return (
    <motion.tr
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="hover:bg-emerald-50/30"
    >
      {/* ---------- Booking ---------- */}
      <td className="px-6 py-4 text-left">
        <div>
          <span className="font-nata-sans-md text-gray-800">
            #{booking.id.toString().padStart(4, "0")}
          </span>
          <p className="text-sm text-gray-500">Booking request</p>
        </div>
      </td>

      {/* ---------- Venue ---------- */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>
          <span className="text-gray-600">{booking.venue_name}</span>
        </div>
      </td>

      {/* ---------- Client ---------- */}
      <td className="px-6 py-4">
        <div>
          <span className="font-nata-sans-md text-gray-800">
            {booking.booker_name}
          </span>
          <p className="text-sm text-gray-500">{booking.booker_email}</p>
        </div>
      </td>

      {/* ---------- Date & Time ---------- */}
      <td className="px-6 py-4">
        <div>
          <span className="text-gray-800">{booking.date}</span>
          <p className="text-sm text-gray-500">
            {booking.start_time} – {booking.end_time}
          </p>
        </div>
      </td>

      {/* ---------- Notes ---------- */}
      <td className="px-6 py-4">
        <span className="text-gray-700">{booking.notes || "—"}</span>
      </td>

      {/* ---------- Status ---------- */}
      <td className="p-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 font-nata-sans-md text-xs ${statusConfig.bg} ${statusConfig.text}`}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </span>
      </td>

      {/* ---------- Actions ---------- */}
      <td className="p-4">
        <div className="flex items-center justify-center">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() => onAccept(booking.id)}
                title="Accept"
                className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-100"
              >
                <Check className="h-4 w-4" />
              </button>

              <button
                onClick={() => onReject(booking.id)}
                title="Reject"
                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}

          {booking.status === "approved" && (
            <button
              onClick={() => onCancel(booking.id)}
              title="Cancel"
              className="rounded-lg p-2 text-orange-600 transition hover:bg-orange-100"
            >
              <Ban className="h-4 w-4" />
            </button>
          )}
        </div>
      </td>
    </motion.tr>
  );
};
