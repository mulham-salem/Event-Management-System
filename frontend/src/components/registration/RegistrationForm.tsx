import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  useCreateRegistration,
  useUpdateRegistration,
} from "../../hooks/useRegistrations";

import type { Registration } from "../../api/registrations";

/* ================= Schema ================= */

const registrationSchema = z.object({
  date: z.string().min(1),
  start_time: z.string().min(1),
  end_time: z.string().min(1),
  notes: z.string().optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

/* ================= Props ================= */

interface RegistrationFormProps {
  registration?: Registration; // undefined => create
  eventId?: string;
  onClose: () => void;
}

/* ================= Component ================= */

export const RegistrationForm = ({
  registration,
  eventId,
  onClose,
}: RegistrationFormProps) => {
  const isEdit = Boolean(registration);

  const createMutation = useCreateRegistration();
  const updateMutation = useUpdateRegistration();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  /* ===== Fill form on edit ===== */
  useEffect(() => {
    if (registration) {
      reset({
        date: registration.date,
        start_time: registration.start_time,
        end_time: registration.end_time,
        notes: registration.notes,
      });
    }
  }, [registration, reset]);

  /* ===== Submit ===== */
  const onSubmit = (data: RegistrationFormData) => {
    const payload = {
      event: eventId!,
      ...data,
    };

    if (isEdit) {
      updateMutation.mutate(
        { id: registration!.id, data },
        {
          onSuccess: () => {
            toast.success("Registration updated successfully");
            onClose();
          },
          onError: () => {
            toast.error("Failed to update registration");
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          toast.success("Registration created successfully");
          onClose();
        },
        onError: () => {
          toast.error("Failed to create registration");
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
          <label className="mb-1 block text-sm text-gray-600">
            Start time
          </label>
          <input
            type="time"
            {...register("start_time")}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5
                       text-sm focus:border-violet-400 focus:outline-none
                       focus:ring-2 focus:ring-violet-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">
            End time
          </label>
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
        {isEdit ? "Update Registration" : "Create Registration"}
      </button>
    </motion.form>
  );
};
