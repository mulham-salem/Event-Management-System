import React, {useRef, useState} from "react";
import { useSearchParams } from "react-router-dom";
import {useEvents, useEvent} from "../hooks/useEvent";

// Components
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {EventsHeader} from "../components/event/EventsHeader";
import {EventsFilters} from "../components/event/EventsFilters";
import {EventsGrid} from "../components/event/EventsGrid";
import {EventCardDetails} from "../components/event/EventCardDetails";
import {Pagination} from "../components/Pagination";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {motion, AnimatePresence} from "framer-motion";

export const Events: React.FC = () => {
    const [searchParams] = useSearchParams();
    const organizerFromUrl = searchParams.get("organizer");
    const [filters, setFilters] = useState({
        search: "",
        min_date: "",
        max_date: "",
        ordering: "",
        organizer: organizerFromUrl ? Number(organizerFromUrl) : 0,
        page: 1,
        page_size: 12,
    });
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const eventsGridTopRef = useRef<HTMLDivElement|null>(null);
    const scrollableNodeRef  = useRef<HTMLDivElement | null>(null);

    // ===== React Query Get Events =====
    // 1) Query: list of events
    const {
        data: eventsData,
        isLoading: eventsLoading,
        isError: eventsError,
        error: eventsErrorObject,
        refetch: refetchEvents,
    } = useEvents(filters);

    if (eventsError)
        console.error("Failed to fetch events:", eventsErrorObject);

    // 2) Query: single event (enabled only when selectedEventId exists)
    const {
        data: eventDetails,
        isLoading: singleLoading,
        isError: singleError,
        error: singleErrorObject,
        refetch: refetchSingle,
    } = useEvent(selectedEventId);

    if (singleError)
        console.error("Failed to fetch single event:", singleErrorObject);

    const page = eventsData?.page ?? filters.page;
    const totalCards = eventsData?.total ?? 0;
    const pageSize = eventsData?.page_size ?? filters.page_size;
    const totalPages = Math.ceil(totalCards / pageSize);
    const results = eventsData?.results ?? [];

    return (
        <section className="flex min-h-screen flex-col bg-gradient-to-tr from-[#dfe9ff] via-[#e3d1fa] to-[#dbf3fb] font-nata-sans-rg">
            {/* NAVBAR */}
            <Header/>

            <SimpleBar 
              scrollableNodeProps={{ref: scrollableNodeRef }} 
              style={{maxHeight: "100vh"}}
              className="custom-scrollbar"
            >
              {/* ===== PAGE CONTENT ===== */}
              <main className="mx-auto w-full flex-1">
                {/* Header */}
                <EventsHeader/>

                <div ref={eventsGridTopRef}/>
                
                {/* Filters */}
                <EventsFilters
                    filters={filters}
                    onChange={(newFilters) => {
                      setFilters((prev) => ({...prev, ...newFilters, page: 1}));
                      setSelectedEventId(null);
                    }}
                />

                {/* Loading States */}
                {(eventsLoading || singleLoading) && (
                    <div className="flex min-h-96 items-center justify-center text-lg text-gray-600">
                      {eventsLoading ? "Loading events..." : "Loading event..."}
                    </div>
                )}

                {/* Error State */}
                {eventsError && (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                      <p className="mb-4 text-red-600">
                        Failed to load events. Try again.
                      </p>
                      <button
                          onClick={() => refetchEvents()}
                          className="rounded-lg bg-violet-700 px-6 py-2 text-white hover:bg-violet-800"
                      >
                        Retry
                      </button>
                    </div>
                )}

                {singleError && (
                    <div className="flex min-h-96 flex-col items-center justify-center text-center">
                      <p className="mb-4 text-red-600">
                        Failed to load event. Try again.
                      </p>
                      <button
                          onClick={() => refetchSingle()}
                          className="rounded-lg bg-violet-700 px-6 py-2 text-white hover:bg-violet-800"
                      >
                        Retry
                      </button>
                    </div>
                )}

                {/* Empty State */}
                {!eventsLoading && !eventsError && results.length === 0 && (
                    <p className="flex min-h-96 flex-col justify-center text-center text-lg text-gray-600">
                      No events found.
                    </p>
                )}

                {/* Events List */}
                {!selectedEventId && !eventsLoading && results.length > 0 && (
                    <AnimatePresence mode="wait">
                      <motion.div
                          key={filters.page + "-" + filters.ordering}
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                          className="mx-auto mb-6 mt-6 w-full max-w-max rounded-3xl bg-white p-8 pb-0 shadow-xl"
                      >
                        <EventsGrid
                            events={results}
                            onSelect={(id: string) => setSelectedEventId(id)}
                        />
                      </motion.div>
                    </AnimatePresence>
                )}

                {/* Show Single Event */}
                {selectedEventId && eventDetails && (
                  <EventCardDetails
                    event={eventDetails}
                    onBack={() => setSelectedEventId(null)}
                  />
                 )}

                {/* Pagination */}
                {!selectedEventId && !eventsLoading && !eventsError && totalCards > 0 && (
                    <Pagination
                        page={page}
                        lastPage={totalPages}
                        total={totalCards}
                        onPageChange={(page) => {
                          setFilters((prev) => ({...prev, page}));
                          const container = scrollableNodeRef.current;
                          const target = eventsGridTopRef.current;

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
              <Footer/>
            </SimpleBar>
        </section>
    );
};
