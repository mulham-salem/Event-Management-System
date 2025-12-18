import React, { useMemo, useRef, useState } from "react";
import { useHosts } from "../hooks/useHost";

// Components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HostsSidebar } from "../components/host/HostsSidebar";
import { HostsGrid } from "../components/host/HostsGrid";
import { Pagination } from "../components/Pagination";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { motion, AnimatePresence } from "framer-motion";

import type { HostRole } from "../api/hosts";

interface HostsProps {
  role: HostRole; // "provider" | "organizer"
}

export const Hosts: React.FC<HostsProps> = ({ role }) => {
  const [filters, setFilters] = useState({
    role,
    search: "",
    min_score: 0,
    min_votes: 0,
    ordering: "",
    page: 1,
    page_size: 12,
  });

  const filterWithUpdateRole = useMemo(() => {
    if (filters.role !== role) {
      return {
        ...filters,
        role,
        page: 1,
      };
    }
    return filters;
  }, [filters, role]);

  const hostsGridTopRef = useRef<HTMLDivElement | null>(null);
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);

  // ===== React Query Get Hosts =====
  const {
    data: hostsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useHosts(filterWithUpdateRole);

  if (isError) {
    console.error("Failed to fetch hosts:", error);
  }

  const page = hostsData?.page ?? filters.page;
  const totalCards = hostsData?.total ?? 0;
  const pageSize = hostsData?.page_size ?? filters.page_size;
  const totalPages = Math.ceil(totalCards / pageSize);
  const results = hostsData?.results ?? [];

  const initialFilters = {
    role,
    search: "",
    min_score: 0,
    min_votes: 0,
    ordering: "",
    page: 1,
    page_size: 12,
  };

  return (
    <section className="flex min-h-screen flex-col bg-gradient-to-br from-[#ede9fe] to-[#e0f2fe] font-nata-sans-rg">
      <Header />

      {/* SimpleBar للصفحة كاملة (main + footer) */}
      <SimpleBar
        style={{
          maxHeight: "100vh",
        }}
        className="custom-scrollbar"
        scrollableNodeProps={{ ref: scrollableNodeRef }}
      >
        <div ref={hostsGridTopRef} />
        <div className="h-[15vh]"></div>

        {/* PAGE CONTENT */}
        <main className="mx-auto flex px-4 py-14">
          <div className="mx-auto flex w-full max-w-7xl gap-6 pb-20">
            {/* Sidebar */}
            <div className="w-1/4 flex-shrink-0">
              <HostsSidebar
                filters={filters}
                onChange={(newFilters) => {
                  setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
                }}
                onClear={() => setFilters(initialFilters)}
              />
            </div>

            {/* GRID COLUMN */}
            <div className="flex min-h-0 flex-1">

              <div className="w-full rounded-3xl bg-white pt-4 shadow-xl">
                {/* Loading State */}
                {isLoading && (
                  <div className="flex h-96 items-center justify-center text-center text-lg text-gray-600">
                    Loading hosts...
                  </div>
                )}

                {/* Error State */}
                {isError && (
                  <div className="flex h-96 flex-col items-center justify-center text-center">
                    <p className="mb-4 text-red-600">
                      Failed to load hosts. Try again.
                    </p>
                    <button
                      onClick={() => refetch()}
                      className="rounded-lg bg-violet-700 px-6 py-2 text-white hover:bg-violet-800"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !isError && results.length === 0 && (
                  <div className="flex h-96 flex-col justify-center text-center text-lg text-gray-600">
                    No hosts found.
                  </div>
                )}

                {/* Hosts Grid */}
                {!isLoading && !isError && results.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${filters.page}-${filters.ordering}-${role}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <HostsGrid hosts={results} />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Pagination */}
                {!isLoading && !isError && totalCards > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <Pagination
                      page={page}
                      lastPage={totalPages}
                      total={totalCards}
                      onPageChange={(page) => {
                        setFilters((prev) => ({ ...prev, page }));

                        const container = scrollableNodeRef.current;
                        const target = hostsGridTopRef.current;

                        if (container && target) {
                          const top =
                            target.getBoundingClientRect().top -
                            container.getBoundingClientRect().top +
                            container.scrollTop;

                          container.scrollTo({
                            top,
                            behavior: "smooth",
                          });
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SimpleBar>
    </section>
  );
};
