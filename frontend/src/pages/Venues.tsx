import React, { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useVenues, useVenue } from "../hooks/useVenue";

// Components
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { VenuesHeader } from "../components/venue/VenuesHeader";
import { VenuesFilters } from "../components/venue/VenuesFilters";
import { VenuesGrid } from "../components/venue/VenuesGrid";
import { VenueCardDetails } from "../components/venue/VenueCardDetails";
import { Pagination } from "../components/Pagination";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { motion, AnimatePresence } from "framer-motion";

export const Venues: React.FC = () => {
  const [searchParams] = useSearchParams();
  const providerFromUrl = searchParams.get("provider");
  const [filters, setFilters] = useState({
    search: "",
    min_capacity: undefined as number | undefined,
    max_capacity: undefined as number | undefined,
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    ordering: "",
    provider: providerFromUrl ? Number(providerFromUrl) : 0,
    page: 1,
    page_size: 12,
  });

  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const venuesGridTopRef = useRef<HTMLDivElement | null>(null);
  const scrollableNodeRef = useRef<HTMLDivElement | null>(null);

  // ===== React Query =====
  // 1) Venues list
  const {
    data: venuesData,
    isLoading: venuesLoading,
    isError: venuesError,
    error: venuesErrorObject,
    refetch: refetchVenues,
  } = useVenues(filters);

  if (venuesError) {
    console.error("Failed to fetch venues:", venuesErrorObject);
  }

  // 2) Single venue
  const {
    data: venueDetails,
    isLoading: singleLoading,
    isError: singleError,
    error: singleErrorObject,
    refetch: refetchSingle,
  } = useVenue(selectedVenueId);

  if (singleError) {
    console.error("Failed to fetch venue:", singleErrorObject);
  }

  const page = venuesData?.page ?? filters.page;
  const totalCards = venuesData?.total ?? 0;
  const pageSize = venuesData?.page_size ?? filters.page_size;
  const totalPages = Math.ceil(totalCards / pageSize);
  const results = venuesData?.results ?? [];

  return (
    <section className="flex min-h-screen flex-col bg-[#f9f7fd] font-nata-sans-rg">
      {/* NAVBAR */}
      <Header />

      <SimpleBar
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        style={{ maxHeight: "100vh" }}
        className="custom-scrollbar"
      >
        <main className="mx-auto w-full flex-1">
          {/* Header */}
          <VenuesHeader />

          <div ref={venuesGridTopRef} />

          {/* Filters */}
          <VenuesFilters
            filters={filters}
            onChange={(newFilters) => {
              setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
              setSelectedVenueId(null);
            }}
          />

          {/* Loading */}
          {(venuesLoading || singleLoading) && (
            <div className="flex min-h-96 items-center justify-center text-lg text-gray-600">
              {venuesLoading ? "Loading venues..." : "Loading venue..."}
            </div>
          )}

          {/* Error */}
          {venuesError && (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
              <p className="mb-4 text-red-600">
                Failed to load venues. Try again.
              </p>
              <button
                onClick={() => refetchVenues()}
                className="rounded-lg bg-violet-700 px-6 py-2 text-white hover:bg-violet-800"
              >
                Retry
              </button>
            </div>
          )}

          {singleError && (
            <div className="flex min-h-96 flex-col items-center justify-center text-center">
              <p className="mb-4 text-red-600">
                Failed to load venue. Try again.
              </p>
              <button
                onClick={() => refetchSingle()}
                className="rounded-lg bg-violet-700 px-6 py-2 text-white hover:bg-violet-800"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!venuesLoading && !venuesError && results.length === 0 && (
            <p className="flex min-h-96 flex-col justify-center text-center text-lg text-gray-600">
              No venues found.
            </p>
          )}

          {/* Venues Grid */}
          {!selectedVenueId && !venuesLoading && results.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={filters.page + "-" + filters.ordering}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto mb-6 mt-6 w-full max-w-max rounded-3xl bg-white p-8 pb-0 shadow-xl"
              >
                <VenuesGrid
                  venues={results}
                  onSelect={(id: string) => setSelectedVenueId(id)}
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Single Venue */}
          {selectedVenueId && venueDetails && (
            <VenueCardDetails
              venue={venueDetails}
              onBack={() => setSelectedVenueId(null)}
            />
          )} 

          {/* Pagination */}
          {!selectedVenueId && !venuesLoading && !venuesError && totalCards > 0 && (
              <Pagination
                page={page}
                lastPage={totalPages}
                total={totalCards}
                onPageChange={(page) => {
                  setFilters((prev) => ({ ...prev, page }));

                  const container = scrollableNodeRef.current;
                  const target = venuesGridTopRef.current;

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
            )}
        </main>

        {/* FOOTER */}
        <Footer />
      </SimpleBar>
    </section>
  );
};
