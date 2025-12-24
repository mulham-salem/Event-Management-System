import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page = 1,
  lastPage = 1,
  onPageChange,
}) => {
  if (lastPage <= 1) return null;

  const MAX_PAGES_TO_SHOW = 5;

  const createPageNumbers = () => {
    let pages: (number | string)[] = [];

    if (lastPage < MAX_PAGES_TO_SHOW) {
      for (let i = 1; i <= lastPage; i++) pages.push(i);
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
      className="mx-auto my-6 flex max-w-6xl items-center justify-center gap-3 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Prev */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="
      flex items-center justify-center
      rounded-xl border border-violet-300
      bg-white p-2
      text-violet-600
      shadow-sm
      transition
      hover:bg-violet-50
      hover:shadow-md
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
      >
        <ChevronLeft size={18} />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1.5">
        {pages.map((p, idx) =>
          p === "..." ? (
            <span
              key={idx}
              className="
            flex h-10 w-10 items-center justify-center
            text-neutral-400
          "
            >
              <MoreHorizontal size={18} />
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => onPageChange(Number(p))}
              className={`
            min-w-[40px] rounded-xl px-3
            py-2
            font-nata-sans-md
            transition
            ${
              p === page
                ? `
                  scale-105
                  border border-violet-300
                  bg-gradient-to-br from-violet-100 to-indigo-100
                  text-violet-700
                  shadow-md
                `
                : `
                  border border-transparent
                  bg-gradient-to-br from-violet-500 to-indigo-500
                  text-white
                  shadow-sm
                  hover:from-violet-600
                  hover:to-indigo-600
                `
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
        className="
      flex items-center justify-center
      rounded-xl border border-violet-300
      bg-white p-2
      text-violet-600
      shadow-sm
      transition
      hover:bg-violet-50
      hover:shadow-md
      disabled:cursor-not-allowed
      disabled:opacity-40
    "
      >
        <ChevronRight size={18} />
      </button>
    </motion.div>
  );
};
