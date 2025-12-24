import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useCreateBooking, useUpdateBooking } from "../../hooks/useBookings";
import type { Booking } from "../../api/bookings";

/* ================= Schema ================= */

const bookingSchema = z.object({
  date: z.string().min(1),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

/* ================= Props ================= */

interface BookingFormProps {
  booking?: Booking; // undefined => create
  venueId?: string;
  onClose: () => void;
}

/* ================= Component ================= */

export const BookingForm = ({ booking, venueId, onClose }: BookingFormProps) => {
  const isEdit = Boolean(booking);
  const createMutation = useCreateBooking();
  const updateMutation = useUpdateBooking();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (booking) {
      reset({
        date: booking.date,
        start_time: booking.start_time,
        end_time: booking.end_time,
        notes: booking.notes,
      });
    }
  }, [booking, reset]);

  const onSubmit = (data: BookingFormData) => {
    const payload = {
      venue: venueId!,
      ...data,
    };
    if (isEdit) {
      updateMutation.mutate(
        { id: booking!.id, data },
        {
          onSuccess: () => {
            toast.success("Booking updated successfully");
            onClose();
          },
          onError: () => {
            toast.error("Failed to update booking");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Booking created successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to create booking");
        },
      });
    }
  };

  /* ================= UI ================= */

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 font-nata-sans-rg"
    >
      {/* Date */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">Date</label>
        <input
          type="date"
          {...register("date")}
          className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                 text-sm focus:border-violet-400 focus:outline-none
                 focus:ring-2 focus:ring-violet-200"
        />
      </div>

      {/* Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm text-gray-600">Start time</label>
          <input
            type="time"
            {...register("start_time")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   text-sm focus:border-violet-400 focus:outline-none
                   focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">End time</label>
          <input
            type="time"
            {...register("end_time")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                   text-sm focus:border-violet-400 focus:outline-none
                   focus:ring-2 focus:ring-violet-200"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">Notes</label>
        <textarea
          {...register("notes")}
          rows={3}
          placeholder="Optional notes..."
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-2.5
                 text-sm focus:border-violet-400 focus:outline-none
                 focus:ring-2 focus:ring-violet-200"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-xl bg-indigo-500 py-2.5
               font-nata-sans-md text-white
               transition hover:bg-indigo-600
               active:scale-[0.98]"
      >
        {isEdit ? "Update Booking" : "Create Booking"}
      </button>
    </motion.form>
  );
};
