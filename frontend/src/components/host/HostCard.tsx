import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Mail, Star, Users, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useVoteForHost } from "../../hooks/useHost";
import type { Host } from "../../api/hosts";

interface HostCardProps {
  host: Host;
}

export const HostCard: React.FC<HostCardProps> = ({ host }) => {
  const navigate = useNavigate();
  const voteMutation = useVoteForHost();

  /* ================= Auth check ================= */
  const canVote = useMemo(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("currentRole");
    return Boolean(token && role === "client");
  }, []);

  /* ================= Vote handlers ================= */
  const handleVote = (value: 1 | -1) => {
    voteMutation.mutate(
      {
        target_user: host.id,
        value,
      },
      {
        onSuccess: () => {
          toast.success("Vote submitted successfully 🔥");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Voting failed");
        },
      }
    );
  };

  /* ================= Navigation ================= */
  const handleViewProfile = () => {
    if (host.role === "organizer") {
      navigate(`/events?organizer=${host.id}`);
    } else {
      navigate(`/venues?provider=${host.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex flex-col rounded-[18px] bg-white p-6 shadow-[0_20px_40px_rgba(124,58,237,0.12)]"
    >
      {/* Role */}
      <span className="mb-3 self-start rounded-full bg-violet-100 px-3 py-1 font-nata-sans-eb text-[11px] text-violet-600">
        {host.role.toUpperCase()}
      </span>

      {/* Top */}
      <div className="mb-5 flex gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 font-nata-sans-eb text-white">
          {host.full_name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="min-w-0">
          <div className="truncate font-nata-sans-bd">{host.full_name}</div>
          <div className="flex items-center gap-1 truncate text-sm text-gray-500">
            <Mail size={14} />
            {host.email}
          </div>
        </div>
      </div>

      {/* Score + Voting */}
      <div className="mt-auto border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-nata-sans-md text-sm">Total Score</span>

          <div className="flex items-center gap-2">
            {/* Voting arrows */}
            {canVote && (
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleVote(1)}
                  disabled={voteMutation.isPending}
                  className="text-gray-400 transition hover:text-green-600"
                >
                  <ChevronUp size={18} />
                </button>

                <button
                  onClick={() => handleVote(-1)}
                  disabled={voteMutation.isPending}
                  className="text-gray-400 transition hover:text-red-600"
                >
                  <ChevronDown size={18} />
                </button>
              </div>
            )}

            <span className="flex items-center gap-1 font-nata-sans-eb text-2xl text-blue-600">
              <Star size={18} />
              {host.votes_score.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <Users size={14} />
          Votes: {host.votes_count}
        </div>
      </div>

      {/* Action */}
      <button
        onClick={handleViewProfile}
        className="mt-4 w-full rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 
                   py-2.5 font-nata-sans-bd text-white 
                   transition hover:opacity-90"
      >
        View Profile
      </button>
    </motion.div>
  );
};
