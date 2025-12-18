import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  page: number;
  lastPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page = 1, lastPage = 1, total = 1, onPageChange }) => {
  if (total <= 1) return null;

  const MAX_PAGES_TO_SHOW = 5;

  const createPageNumbers = () => {
    let pages: (number | string)[] = [];

    if (total <= MAX_PAGES_TO_SHOW) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    if (page <= 3) {
      pages = [1, 2, 3, "...", lastPage];
    } else if (page >= lastPage - 2) {
      pages = [1, "...", lastPage - 2, lastPage - 1, lastPage];
    } else {
      pages = [1, "...", page - 1, page, page + 1, "...", lastPage];
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <motion.div
      className="mx-auto my-4 flex max-w-6xl items-center justify-center gap-2 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="rounded-xl border border-violet-400 p-2 font-nata-sans-md transition hover:bg-gradient-to-br from-violet-100 to-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={idx}
              className="px-3 py-1 font-nata-sans-md text-neutral-400"
            >
              <MoreHorizontal size={18} />
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(Number(p))}
              className={`
                rounded-xl px-4 py-2 font-nata-sans-md
                transition
                ${
                  p === page
                    ? "border border-[#5a2ea6]/20 bg-gradient-to-br from-violet-100 to-indigo-100 text-[#7052a8]"
                    : "border border-[#5a2ea6]/50 bg-gradient-to-br from-violet-500 to-indigo-500  text-[#ffffff]"
                }
              `}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === lastPage}
        className="rounded-xl border border-violet-400 p-2 font-nata-sans-md transition hover:bg-gradient-to-br from-violet-100 to-indigo-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
};
 